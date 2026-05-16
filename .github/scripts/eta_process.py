"""
ETA-Prozessor: verarbeitet GitHub-Issues mit zwei moeglichen Titel-Praefixen:

  1) "ETA: <wort> [#Kategorie]"      -> fuegt ein NEUES Wort hinzu (klassischer Modus)
  2) "ETA-FIX: <wort> [#Schluessel]" -> aktualisiert das BILD eines existierenden Worts

Der Bot schreibt:
- In index.html das WORDS-Array (Add: anhaengen, Fix: imageUrl ueberschreiben)
- In vokabeln.xlsx eine Zeile (Add: append, Fix: imageUrl-Zelle ueberschreiben)
- In .github/commit_msg.txt die Commit-Message, die der Workflow uebernimmt
- In .github/issue_msg.txt die Schliess-Nachricht fuer das Issue
"""

import json
import os
import re
import sys
import time
import urllib.parse
from datetime import date
from pathlib import Path

import requests
from anthropic import Anthropic
from openpyxl import load_workbook

# ---------- Konfiguration ----------

ROOT = Path(__file__).resolve().parents[2]
HTML_FILE = ROOT / "index.html"
XLSX_FILE = ROOT / "vokabeln.xlsx"
COMMIT_MSG_FILE = ROOT / ".github" / "commit_msg.txt"
ISSUE_MSG_FILE = ROOT / ".github" / "issue_msg.txt"

CLAUDE_MODEL = "claude-sonnet-4-5"  # schnell & guenstig, gute Qualitaet

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
- "imageKeyword": Wenn wordType = "Nomen", ein englisches Suchwort fuer ein generisches Wikimedia-Commons-Bild (z.B. "Brick wall"). Sonst leerer String.

Antworte NUR mit dem JSON-Objekt, ohne Code-Fence, ohne Erklaerung."""


# ---------- Hilfsfunktionen ----------

def write_commit_msg(msg: str):
    COMMIT_MSG_FILE.parent.mkdir(parents=True, exist_ok=True)
    COMMIT_MSG_FILE.write_text(msg, encoding="utf-8")


def write_issue_msg(msg: str):
    ISSUE_MSG_FILE.parent.mkdir(parents=True, exist_ok=True)
    ISSUE_MSG_FILE.write_text(msg, encoding="utf-8")


def parse_eta_title(title: str):
    """ETA: brick #TV  ->  ("brick", "TV")"""
    body = title[len("ETA:"):].strip() if title.lower().startswith("eta:") else title
    cat_match = re.search(r"#(\S+)", body)
    category = cat_match.group(1) if cat_match else "Allgemein"
    word = re.sub(r"#\S+", "", body).strip().strip(",").strip()
    return word, category


def parse_fix_title(title: str):
    """ETA-FIX: sugar bowl #china_tea_set  ->  ("sugar bowl", "china tea set")
    Der optionale Hashtag ist ein Override-Suchbegriff fuer das Bild.
    Unterstriche im Hashtag werden in Leerzeichen umgewandelt."""
    body = title[len("ETA-FIX:"):].strip() if title.lower().startswith("eta-fix:") else title
    kw_match = re.search(r"#(\S+)", body)
    keyword_override = kw_match.group(1).replace("_", " ") if kw_match else None
    word = re.sub(r"#\S+", "", body).strip().strip(",").strip()
    return word, keyword_override


def ask_claude(word: str) -> dict:
    client = Anthropic()
    msg = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=600,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": f"Wort: {word}"}],
    )
    text = msg.content[0].text.strip()
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text, flags=re.MULTILINE).strip()
    return json.loads(text)


def find_wikimedia_image(keyword: str) -> str:
    """Sucht ein Bild auf Wikimedia Commons und liefert eine stabile Special:FilePath-URL."""
    if not keyword:
        return ""
    try:
        api = "https://commons.wikimedia.org/w/api.php"
        params = {
            "action": "query",
            "format": "json",
            "list": "search",
            "srsearch": f"{keyword} filetype:bitmap",
            "srnamespace": "6",
            "srlimit": "5",
        }
        r = requests.get(api, params=params, headers={"User-Agent": "ETA-Bot/1.0"}, timeout=15)
        r.raise_for_status()
        hits = r.json().get("query", {}).get("search", [])
        for h in hits:
            title = h.get("title", "")
            if title.lower().startswith("file:"):
                filename = title[5:]
                if re.search(r"\.(jpg|jpeg|png|gif|webp)$", filename, re.I):
                    safe = filename.replace(" ", "_")
                    return f"https://commons.wikimedia.org/wiki/Special:FilePath/{safe}?width=400"
    except Exception as e:
        print(f"Wikimedia-Lookup fehlgeschlagen: {e}", file=sys.stderr)
    return ""


def find_wikipedia_image(keyword: str) -> str:
    """Fallback: holt das Hauptbild des englischen Wikipedia-Artikels."""
    if not keyword:
        return ""
    try:
        title = urllib.parse.quote(keyword.strip().replace(" ", "_"))
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title}"
        r = requests.get(url, headers={"User-Agent": "ETA-Bot/1.0"}, timeout=15)
        if r.status_code != 200:
            return ""
        data = r.json()
        if data.get("type") == "disambiguation":
            return ""
        img = (
            data.get("originalimage", {}).get("source")
            or data.get("thumbnail", {}).get("source", "")
        )
        return img or ""
    except Exception as e:
        print(f"Wikipedia-Lookup fehlgeschlagen: {e}", file=sys.stderr)
    return ""


def search_image(keyword: str, word_fallback: str = "") -> str:
    """Vereinheitlichte Suche: erst Wikimedia, dann Wikipedia-Artikelbild."""
    img = find_wikimedia_image(keyword)
    if not img and word_fallback:
        img = find_wikipedia_image(word_fallback or keyword)
        if img:
            print("Fallback: Wikipedia-Artikelbild.")
    elif not img:
        img = find_wikipedia_image(keyword)
        if img:
            print("Fallback: Wikipedia-Artikelbild.")
    return img


def next_word_id(html: str) -> int:
    ids = [int(m) for m in re.findall(r'\bid"?\s*:\s*(\d+)', html)]
    return (max(ids) + 1) if ids else 1


def normalize_word(w: str) -> str:
    """Normalisiert fuer Vergleich: lowercase, trim, fuehrendes 'to ' weg."""
    if not w:
        return ""
    w = w.strip().lower()
    if w.startswith("to "):
        w = w[3:].strip()
    return w


def word_already_exists(word_raw: str) -> bool:
    if not HTML_FILE.exists():
        return False
    try:
        html = HTML_FILE.read_text(encoding="utf-8")
    except Exception:
        return False
    existing = re.findall(r'\bword"?\s*:\s*"([^"]+)"', html)
    candidate = normalize_word(word_raw)
    return any(normalize_word(w) == candidate for w in existing)


def js_escape(s: str) -> str:
    if s is None:
        s = ""
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()


def find_word_block_bounds(html: str, word_name: str):
    """Sucht im WORDS-Array das Objekt-Block des gegebenen Worts.
    Returns (start_idx, end_idx_inclusive) oder None.
    Akzeptiert sowohl mehrzeiligen JS-Stil als auch kompakten JSON-Stil.
    """
    target = normalize_word(word_name)
    m = re.search(r"const\s+WORDS\s*=\s*\[", html)
    if not m:
        return None
    arr_start = m.end()
    arr_depth = 1
    i = arr_start
    while i < len(html) and arr_depth > 0:
        c = html[i]
        if c == "[":
            arr_depth += 1
            i += 1
        elif c == "]":
            arr_depth -= 1
            if arr_depth == 0:
                break
            i += 1
        elif c == "{":
            # Object Start - finde matching close-brace, respektiere Strings
            obj_depth = 1
            j = i + 1
            in_string = False
            escape = False
            while j < len(html) and obj_depth > 0:
                cj = html[j]
                if escape:
                    escape = False
                elif cj == "\\":
                    escape = True
                elif in_string:
                    if cj == '"':
                        in_string = False
                else:
                    if cj == '"':
                        in_string = True
                    elif cj == "{":
                        obj_depth += 1
                    elif cj == "}":
                        obj_depth -= 1
                        if obj_depth == 0:
                            break
                j += 1
            if obj_depth != 0:
                break
            block = html[i:j+1]
            wm = re.search(r'(?:"word"|\bword)\s*:\s*"((?:[^"\\]|\\.)*)"', block)
            if wm and normalize_word(wm.group(1)) == target:
                return i, j  # j inkl. das schliessende }
            i = j + 1
        else:
            i += 1
    return None


def update_word_imageurl(word_name: str, new_url: str) -> bool:
    """Findet das Wort im WORDS-Array und ueberschreibt imageUrl."""
    html = HTML_FILE.read_text(encoding="utf-8")
    bounds = find_word_block_bounds(html, word_name)
    if not bounds:
        print(f"Wort '{word_name}' nicht im WORDS-Array gefunden.")
        return False
    s, e = bounds
    block = html[s:e+1]
    new_block, count = re.subn(
        r'((?:"imageUrl"|\bimageUrl)\s*:\s*)"(?:[^"\\]|\\.)*"',
        r'\1"' + js_escape(new_url) + '"',
        block,
        count=1,
    )
    if count == 0:
        print(f"imageUrl-Feld im Wort '{word_name}' nicht gefunden, fuege es ein.")
        # Falls das Feld fehlt: vor dem schliessenden '}' einfuegen
        new_block = re.sub(r"\}\s*$", f',\n    imageUrl: "{js_escape(new_url)}"\n  }}', block)
    new_html = html[:s] + new_block + html[e+1:]
    HTML_FILE.write_text(new_html, encoding="utf-8")
    print(f"index.html: imageUrl fuer '{word_name}' aktualisiert.")
    return True


def update_xlsx_imageurl(word_name: str, new_url: str) -> bool:
    if not XLSX_FILE.exists():
        print("vokabeln.xlsx nicht gefunden - ueberspringe.")
        return False
    wb = load_workbook(XLSX_FILE)
    ws = wb.active
    target = normalize_word(word_name)
    # Spaltenreihenfolge: Wort | Uebersetzung | IPA | Wortart | Definition | Bsp1 | Bsp2 | Bild URL | ...
    # Bild URL = Spalte H = Index 7 (0-indexed)
    for row in ws.iter_rows(min_row=2):
        cell_word = row[0].value
        if cell_word and normalize_word(str(cell_word)) == target:
            if len(row) > 7:
                row[7].value = new_url
            wb.save(XLSX_FILE)
            print(f"vokabeln.xlsx: Bild-URL fuer '{word_name}' aktualisiert.")
            return True
    print(f"Wort '{word_name}' nicht in vokabeln.xlsx gefunden - xlsx unveraendert.")
    return False


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
        f'"imageUrl":"{js_escape(data.get("imageUrl",""))}",'
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
        data.get("imageUrl", ""),
        int(data.get("difficulty", 2)),
        date.today().isoformat(),
        "",
        category,
    ])
    wb.save(XLSX_FILE)
    print("In vokabeln.xlsx angehaengt.")


# ---------- Modi ----------

def process_add(title: str, issue_number: str):
    """Klassischer Modus: ETA: <wort> [#kategorie]"""
    word_raw, category = parse_eta_title(title)
    if not word_raw:
        print("Kein Wort im Issue-Titel gefunden.")
        sys.exit(1)

    if word_already_exists(word_raw):
        print(f"Dublettenschutz: '{word_raw}' steht bereits in der Wortliste - ueberspringe.")
        write_issue_msg(f"Das Wort '{word_raw}' steht bereits in der Liste - kein Doppeleintrag noetig.")
        return False  # nichts committet

    print(f"Verarbeite Wort: '{word_raw}' (Kategorie: {category})")
    data = ask_claude(word_raw)
    print("Claude-Antwort:", data)

    if word_already_exists(data.get("word", "")):
        print(f"Dublettenschutz nach Normalisierung: '{data['word']}' ist schon drin.")
        write_issue_msg(f"Nach Normalisierung war '{data['word']}' bereits in der Liste - kein Doppeleintrag.")
        return False

    if data.get("wordType") == "Nomen":
        keyword = data.get("imageKeyword") or data.get("word", "")
        data["imageUrl"] = search_image(keyword, data.get("word", ""))
        print(f"Bild-URL: {data['imageUrl']}")
    else:
        data["imageUrl"] = ""

    append_word_to_html(data, category)
    append_word_to_xlsx(data, category)
    write_commit_msg(f"ETA: Neues Wort '{data['word']}' aus Issue #{issue_number}")
    write_issue_msg(f"Wort '{data['word']}' aufgenommen. Die App aktualisiert sich in ca. 1 Minute.")
    return True


def process_fix(title: str, issue_number: str):
    """Update-Modus: ETA-FIX: <wort> [#suchwort_override]"""
    word_raw, keyword_override = parse_fix_title(title)
    if not word_raw:
        print("Kein Wort im Issue-Titel gefunden.")
        sys.exit(1)

    print(f"Update-Modus fuer Wort: '{word_raw}'")
    if keyword_override:
        print(f"Override-Suchbegriff: '{keyword_override}'")

    if not word_already_exists(word_raw):
        msg = f"Wort '{word_raw}' steht nicht in der Wortliste - kann nicht aktualisieren."
        print(msg)
        write_issue_msg(msg)
        return False

    # Bild-Suche
    keyword = keyword_override or word_raw
    img = search_image(keyword, word_raw)
    if not img:
        msg = f"Kein Bild fuer '{keyword}' gefunden. Versuch's mit einem konkreteren Hashtag, z.B. 'ETA-FIX: {word_raw} #englisches_Suchwort'."
        print(msg)
        write_issue_msg(msg)
        return False

    ok_html = update_word_imageurl(word_raw, img)
    if not ok_html:
        write_issue_msg(f"Konnte '{word_raw}' im index.html nicht finden.")
        return False
    update_xlsx_imageurl(word_raw, img)
    write_commit_msg(f"ETA-FIX: Bild fuer '{word_raw}' aktualisiert (Issue #{issue_number})")
    write_issue_msg(f"Bild fuer '{word_raw}' wurde aktualisiert: {img}\n\nIn ca. 1 Minute live in der App.")
    return True


# ---------- Main ----------

def main():
    title = os.environ.get("ISSUE_TITLE", "").strip()
    issue_number = os.environ.get("ISSUE_NUMBER", "?")

    # Default-Commit-Message, falls die Skript-Logik vor write_commit_msg abstuerzt
    write_commit_msg(f"ETA-Bot: Aenderungen aus Issue #{issue_number}")
    write_issue_msg("Verarbeitet.")

    title_low = title.lower()
    if title_low.startswith("eta-fix:"):
        process_fix(title, issue_number)
    elif title_low.startswith("eta:"):
        process_add(title, issue_number)
    else:
        print(f"Kein ETA/ETA-FIX-Issue (Titel: '{title}'), breche ab.")
        write_issue_msg("Titel passt nicht zum Bot-Format (ETA: oder ETA-FIX:).")
        sys.exit(0)


if __name__ == "__main__":
    main()
