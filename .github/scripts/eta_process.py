"""
ETA-Prozessor: verarbeitet ein GitHub-Issue mit Titel "ETA: <wort> [#Kategorie]",
ruft die Claude API auf, ermittelt bei Nomen einen passenden Wikipedia-Artikel und
schreibt das Ergebnis in index.html (WORDS-Array + WIKI_TITLES-Map) sowie in vokabeln.xlsx.

Bild-Logik (seit 2026-06-15 an das App-Bildsystem angepasst):
Die App holt Bilder zur Laufzeit über die Map `const WIKI_TITLES` (Wort -> Wikipedia-Artikel)
und die Wikipedia-REST-API. Alte, fest gespeicherte `Special:FilePath`-URLs werden von der
App ignoriert. Darum schreibt der Bot KEINE imageUrl mehr ins WORDS-Array, sondern legt für
Nomen einen WIKI_TITLES-Eintrag an. Die xlsx-Spalte "Bild URL" bekommt zur Referenz die
aufgelöste direkte Bild-URL.

Die zentrale Funktion `process_word()` wird sowohl vom Issue-Flow (diese Datei) als auch
vom Tages-Batch (eta_batch.py) genutzt.
"""

import json
import os
import re
import sys
import urllib.parse
from datetime import date
from pathlib import Path

import requests
from anthropic import Anthropic
from openpyxl import load_workbook

# ---------- Konfiguration ----------

ROOT = Path(__file__).resolve().parents[2]
HTML_FILE = ROOT / "index.html"
MIRROR_FILE = ROOT / "English_Trainer.html"  # exakte Kopie von index.html (lokales Backup)
XLSX_FILE = ROOT / "vokabeln.xlsx"

CLAUDE_MODEL = "claude-sonnet-4-5"  # schnell & guenstig, gute Qualitaet
UA = {"User-Agent": "ETA-Bot/1.0 (English Trainer)"}

SYSTEM_PROMPT = """Du bist ein Englisch-Lehrer-Assistent. Der Nutzer nennt dir ein englisches Wort.
Liefere ein JSON-Objekt mit exakt diesen Feldern:
- "word": das Wort in folgender Formatierung (WICHTIG, genau einhalten):
    * Nomen: erster Buchstabe gross, Rest klein (z.B. "Napkin", "Handkerchief"). Eigennamen behalten ihre uebliche Schreibung.
    * Verb: "to <verb>" in Kleinbuchstaben (z.B. "to struggle", "to overcome"). Das Wort "to" gehoert IMMER dazu.
    * Adjektiv/Adverb: Kleinbuchstaben (z.B. "beautiful", "quickly").
    * Praeposition/Konjunktion: Kleinbuchstaben.
    * Phrase: wie im Englischen ueblich geschrieben (z.B. "piece of cake").
- "translation": Deutsche Uebersetzung (max. 4 Woerter). Bei Verben "<verb>" mit deutschem Infinitiv (z.B. "kaempfen") - ohne "zu".
- "pronunciation": IPA-Lautschrift in Slashes, z.B. "/brik/"
- "wordType": Einer von "Nomen", "Verb", "Adjektiv", "Adverb", "Praeposition", "Konjunktion", "Phrase"
- "definition": Kurze englische Definition (max. 15 Woerter)
- "examples": Array mit genau 2 einfachen englischen Beispielsaetzen
- "difficulty": 1 (einfach), 2 (mittel) oder 3 (schwer)
- "imageKeyword": Wenn wordType = "Nomen", der Titel des passendsten englischen Wikipedia-Artikels, der ein generisches Bild des Gegenstands enthaelt (z.B. "Brick", "Frying pan", "Refrigerator"). Bei abstrakten Nomen ohne sinnvolles Bild ein leerer String. Sonst leerer String.

Antworte NUR mit dem JSON-Objekt, ohne Code-Fence, ohne Erklaerung."""


# ---------- Parsing ----------

def parse_word_and_category(text: str):
    """'brick #TV' -> ('brick', 'TV');  'napkin' -> ('napkin', 'Allgemein')."""
    cat_match = re.search(r"#(\S+)", text)
    category = cat_match.group(1) if cat_match else "Allgemein"
    word = re.sub(r"#\S+", "", text).strip().strip(",").strip()
    return word, category


def parse_issue_title(title: str):
    """ETA: brick #TV  ->  ('brick', 'TV')."""
    body = title[len("ETA:"):].strip() if title.lower().startswith("eta:") else title
    return parse_word_and_category(body)


# ---------- Claude ----------

def ask_claude(word: str) -> dict:
    client = Anthropic()
    msg = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=600,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": f"Wort: {word}"}],
    )
    text = msg.content[0].text.strip()
    # Sicherheitsnetz: falls Claude doch mal einen Code-Fence liefert
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text, flags=re.MULTILINE).strip()
    return json.loads(text)


# ---------- Bild / Wikipedia ----------

def resolve_wikipedia(keyword: str):
    """Sucht den passenden Wikipedia-Artikel zum Stichwort.

    Liefert (canonical_title, image_url):
    - canonical_title: Artikeltitel in Unterstrich-Form (z.B. 'Kitchen_stove') fuer WIKI_TITLES,
      oder None wenn kein brauchbarer, bebildeter Artikel gefunden wurde.
    - image_url: direkte Bild-URL (nur fuer die xlsx-Referenzspalte), sonst "".
    Disambiguierungsseiten und bildlose Artikel werden verworfen.
    """
    if not keyword:
        return (None, "")
    try:
        title = urllib.parse.quote(keyword.strip().replace(" ", "_"))
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title}"
        r = requests.get(url, headers=UA, timeout=15)
        if r.status_code != 200:
            return (None, "")
        d = r.json()
        if d.get("type") == "disambiguation":
            return (None, "")
        img = (
            d.get("originalimage", {}).get("source")
            or d.get("thumbnail", {}).get("source", "")
        )
        if not img:
            return (None, "")
        canonical = (
            d.get("titles", {}).get("canonical")
            or d.get("title", "").replace(" ", "_")
        )
        return (canonical, img)
    except Exception as e:
        print(f"Wikipedia-Lookup fehlgeschlagen ({keyword}): {e}", file=sys.stderr)
        return (None, "")


# ---------- Dubletten / Helfer ----------

def next_word_id(html: str) -> int:
    # Erkennt sowohl JS-Kurzstil (id: 1) als auch JSON-Stil ("id": 1)
    ids = [int(m) for m in re.findall(r'\bid"?\s*:\s*(\d+)', html)]
    return (max(ids) + 1) if ids else 1


def normalize_word(w: str) -> str:
    """Normalisiert ein Wort fuer den Dubletten-Vergleich (klein, ohne fuehrendes 'to ')."""
    if not w:
        return ""
    w = w.strip().lower()
    if w.startswith("to "):
        w = w[3:].strip()
    return w


def word_already_exists(word_raw: str) -> bool:
    """Prueft, ob das Wort schon im WORDS-Array von index.html steht."""
    if not HTML_FILE.exists():
        return False
    try:
        html = HTML_FILE.read_text(encoding="utf-8")
    except Exception:
        return False
    # nur den WORDS-Bereich betrachten, damit WIKI_TITLES-Keys keine Falschtreffer ausloesen
    m = re.search(r"const\s+WORDS\s*=\s*\[", html)
    scope = html[m.start():] if m else html
    existing = re.findall(r'\bword"?\s*:\s*"([^"]+)"', scope)
    candidate = normalize_word(word_raw)
    return any(normalize_word(w) == candidate for w in existing)


def js_escape(s: str) -> str:
    if s is None:
        s = ""
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()


def js_escape_single(s: str) -> str:
    if s is None:
        s = ""
    return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", " ").strip()


# ---------- index.html schreiben ----------

def add_wiki_title_to_html(word: str, title: str):
    """Ergaenzt einen Eintrag 'Word':'Article_Title' am Anfang der WIKI_TITLES-Map."""
    html = HTML_FILE.read_text(encoding="utf-8")
    m = re.search(r"const\s+WIKI_TITLES\s*=\s*\{", html)
    if not m:
        print("WIKI_TITLES-Map nicht gefunden - ueberspringe Bild-Mapping.")
        return
    start = m.end()
    depth = 1
    i = start
    while i < len(html) and depth > 0:
        c = html[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                break
        i += 1
    block = html[start:i]
    if re.search(r"""['"]""" + re.escape(word) + r"""['"]\s*:""", block):
        print(f"WIKI_TITLES enthaelt '{word}' bereits.")
        return
    entry = f"\n  '{js_escape_single(word)}':'{js_escape_single(title)}',"
    new_html = html[:start] + entry + html[start:]
    HTML_FILE.write_text(new_html, encoding="utf-8")
    print(f"WIKI_TITLES-Eintrag ergaenzt: {word} -> {title}")


def append_word_to_html(data: dict, category: str):
    html = HTML_FILE.read_text(encoding="utf-8")
    wid = next_word_id(html)
    today = date.today().isoformat()

    examples = data.get("examples", [])
    ex1 = examples[0] if len(examples) > 0 else ""
    ex2 = examples[1] if len(examples) > 1 else ""

    entry = (
        "  {"
        f'"id":{wid},'
        f'"word":"{js_escape(data["word"])}",'
        f'"translation":"{js_escape(data["translation"])}",'
        f'"pronunciation":"{js_escape(data["pronunciation"])}",'
        f'"wordType":"{js_escape(data["wordType"])}",'
        f'"definition":"{js_escape(data["definition"])}",'
        f'"examples":["{js_escape(ex1)}","{js_escape(ex2)}"],'
        f'"imageUrl":"",'  # bewusst leer: Bild kommt zur Laufzeit ueber WIKI_TITLES
        f'"difficulty":{int(data.get("difficulty",2))},'
        f'"dateAdded":"{today}",'
        f'"notes":"",'
        f'"category":"{js_escape(category)}"'
        "}"
    )

    m = re.search(r"const\s+WORDS\s*=\s*\[", html)
    if not m:
        raise RuntimeError("WORDS-Array nicht in index.html gefunden.")
    start = m.end()
    depth = 1
    i = start
    while i < len(html) and depth > 0:
        c = html[i]
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                break
        i += 1
    if depth != 0:
        raise RuntimeError("Ende von WORDS-Array nicht gefunden.")
    before = html[:i].rstrip()
    after = html[i:]
    separator = ",\n" if before.endswith("}") else "\n"
    new_html = before + separator + entry + "\n" + after
    HTML_FILE.write_text(new_html, encoding="utf-8")
    print(f"In index.html eingefuegt (id={wid}).")


def append_word_to_xlsx(data: dict, category: str):
    if not XLSX_FILE.exists():
        print("vokabeln.xlsx nicht gefunden - ueberspringe.")
        return
    wb = load_workbook(XLSX_FILE)
    ws = wb.active
    examples = data.get("examples", [])
    ws.append([
        data["word"],
        data["translation"],
        data["pronunciation"],
        data["wordType"],
        data["definition"],
        examples[0] if len(examples) > 0 else "",
        examples[1] if len(examples) > 1 else "",
        data.get("_imageRef", ""),  # direkte Bild-URL nur zur Referenz
        int(data.get("difficulty", 2)),
        date.today().isoformat(),
        "",
        category,
    ])
    wb.save(XLSX_FILE)
    print("In vokabeln.xlsx angehaengt.")


def mirror_html():
    """Spiegelt index.html 1:1 nach English_Trainer.html (lokales Backup bleibt synchron)."""
    try:
        if HTML_FILE.exists():
            MIRROR_FILE.write_text(HTML_FILE.read_text(encoding="utf-8"), encoding="utf-8")
            print("English_Trainer.html gespiegelt.")
    except Exception as e:
        print(f"Spiegeln fehlgeschlagen: {e}", file=sys.stderr)


# ---------- Zentrale Pipeline ----------

def process_word(word_raw: str, category: str) -> str:
    """Verarbeitet ein einzelnes Wort komplett.

    Rueckgabe: 'added' | 'dup' | 'empty'  (Exceptions werden nach oben durchgereicht).
    """
    if not word_raw:
        return "empty"

    # Doppelcheck VOR dem (kostenpflichtigen) Claude-Call
    if word_already_exists(word_raw):
        print(f"Dublettenschutz: '{word_raw}' steht bereits in der Wortliste - ueberspringe.")
        return "dup"

    print(f"Verarbeite Wort: '{word_raw}' (Kategorie: {category})")
    data = ask_claude(word_raw)
    print("Claude-Antwort:", data)

    # Zweiter Doppelcheck nach Claude's Normalisierung (z.B. 'running' -> 'to run')
    if word_already_exists(data.get("word", "")):
        print(f"Dublettenschutz: '{word_raw}' wurde als '{data.get('word')}' normalisiert - bereits vorhanden, ueberspringe.")
        return "dup"

    # Bild-Mapping fuer Nomen: WIKI_TITLES-Eintrag statt fester URL
    data["_imageRef"] = ""
    if data.get("wordType") == "Nomen":
        keyword = data.get("imageKeyword") or data.get("word", "")
        title, img = resolve_wikipedia(keyword)
        if not title:
            title, img = resolve_wikipedia(data.get("word", ""))
        if title:
            add_wiki_title_to_html(data["word"], title)
            data["_imageRef"] = img
            print(f"Bild ueber WIKI_TITLES: {data['word']} -> {title}")
        else:
            print(f"Kein bebilderter Wikipedia-Artikel fuer '{data['word']}' - Emoji-Fallback.")

    append_word_to_html(data, category)
    append_word_to_xlsx(data, category)
    return "added"


# ---------- Main (Issue-Flow) ----------

def main():
    title = os.environ.get("ISSUE_TITLE", "")
    if not title.lower().startswith("eta:"):
        print("Kein ETA-Issue, breche ab.")
        return

    word_raw, category = parse_issue_title(title)
    if not word_raw:
        print("Kein Wort im Issue-Titel gefunden.")
        sys.exit(1)

    status = process_word(word_raw, category)
    if status == "added":
        mirror_html()
    print("Fertig.")


if __name__ == "__main__":
    main()
