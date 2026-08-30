"""
ETA-Prozessor: verarbeitet ein GitHub-Issue mit Titel "ETA: <wort> [#Kategorie]",
ruft die Claude API auf, ermittelt bei Nomen einen passenden Wikipedia-Artikel und
schreibt das Ergebnis in words.js (WORDS / WIKI_TITLES / IMG_URLS). vokabeln.xlsx
wird anschliessend komplett aus words.js generiert (build_xlsx.py).

Datenzugriff: words_data.py liest/schreibt die drei Bloecke als striktes JSON —
kein Regex-Einfuegen mehr, sondern lesen → Datenstruktur aendern → speichern.

Die zentrale Funktion `process_word()` wird sowohl vom Issue-Flow (diese Datei)
als auch vom Tages-Batch (eta_batch.py) genutzt.
"""

import json
import os
import re
import sys
import urllib.parse
from datetime import date

import requests
from anthropic import Anthropic

import build_xlsx
from words_data import ROOT, load_data, normalize_word, save_data

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
- "exampleDE": die deutsche Uebersetzung von examples[0] (ein natuerlicher, korrekter deutscher Satz)
- "difficulty": CEFR-Stufe als String, einer von "A1", "A2", "B1", "B2", "C1", "C2"
- "imageKeyword": Wenn wordType = "Nomen", der Titel des passendsten englischen Wikipedia-Artikels, der ein generisches Bild des Gegenstands enthaelt (z.B. "Brick", "Frying pan", "Refrigerator"). Bei abstrakten Nomen ohne sinnvolles Bild ein leerer String. Sonst leerer String.

WICHTIG: Alle deutschen Texte ("translation", "exampleDE") in SCHWEIZER Rechtschreibung -
niemals "ß" verwenden, immer "ss" (z.B. "geniessen" statt "genießen", "Strasse" statt "Straße").

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

    Liefert (canonical_title, thumb_url):
    - canonical_title: Artikeltitel in Unterstrich-Form (z.B. 'Kitchen_stove') fuer WIKI_TITLES,
      oder None wenn kein brauchbarer, bebilderter Artikel gefunden wurde.
    - thumb_url: Thumbnail-URL (~320px) fuer die IMG_URLS-Map, sonst "".
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
        thumb = d.get("thumbnail", {}).get("source", "")
        if not thumb:
            return (None, "")
        canonical = (
            d.get("titles", {}).get("canonical")
            or d.get("title", "").replace(" ", "_")
        )
        return (canonical, thumb)
    except Exception as e:
        print(f"Wikipedia-Lookup fehlgeschlagen ({keyword}): {e}", file=sys.stderr)
        return (None, "")


# ---------- Helfer ----------

CEFR_LEVELS = {"A1", "A2", "B1", "B2", "C1", "C2"}
LEGACY_DIFFICULTY = {1: "A2", 2: "B1", 3: "C1", "1": "A2", "2": "B1", "3": "C1"}


def cefr_difficulty(value) -> str:
    """Normalisiert difficulty auf eine CEFR-Stufe (die App faerbt Badges danach)."""
    if isinstance(value, str):
        v = value.strip().upper()
        if v in CEFR_LEVELS:
            return v
    return LEGACY_DIFFICULTY.get(value, "B1")


def swiss(text: str) -> str:
    """Schweizer Rechtschreibung erzwingen (falls Claude doch ein ß liefert)."""
    return (text or "").replace("ß", "ss")


# ---------- Zentrale Pipeline ----------

def process_word(word_raw: str, category: str) -> str:
    """Verarbeitet ein einzelnes Wort komplett.

    Rueckgabe: 'added' | 'dup' | 'empty'  (Exceptions werden nach oben durchgereicht).
    """
    if not word_raw:
        return "empty"

    words, wiki, imgs = load_data()
    existing = {normalize_word(w.get("word", "")) for w in words}

    # Doppelcheck VOR dem (kostenpflichtigen) Claude-Call
    if normalize_word(word_raw) in existing:
        print(f"Dublettenschutz: '{word_raw}' steht bereits in der Wortliste - ueberspringe.")
        return "dup"

    print(f"Verarbeite Wort: '{word_raw}' (Kategorie: {category})")
    data = ask_claude(word_raw)
    print("Claude-Antwort:", data)

    # Zweiter Doppelcheck nach Claude's Normalisierung (z.B. 'running' -> 'to run')
    if normalize_word(data.get("word", "")) in existing:
        print(f"Dublettenschutz: '{word_raw}' wurde als '{data.get('word')}' normalisiert - bereits vorhanden, ueberspringe.")
        return "dup"

    word = swiss(data.get("word", "")).strip()
    examples = data.get("examples") or []

    # Bild-Mapping fuer Nomen: WIKI_TITLES-Eintrag + feste Thumbnail-URL
    if data.get("wordType") == "Nomen":
        keyword = data.get("imageKeyword") or word
        title, thumb = resolve_wikipedia(keyword)
        if not title:
            title, thumb = resolve_wikipedia(word)
        if title:
            wiki.setdefault(word, title)
            if thumb:
                imgs.setdefault(word.lower(), thumb)
            print(f"Bild ueber WIKI_TITLES: {word} -> {title}")
        else:
            print(f"Kein bebilderter Wikipedia-Artikel fuer '{word}' - Emoji-Fallback.")

    new_id = max((int(w.get("id", 0)) for w in words), default=0) + 1
    words.append({
        "id": new_id,
        "word": word,
        "translation": swiss(data.get("translation", "")),
        "pronunciation": data.get("pronunciation", ""),
        "wordType": data.get("wordType", ""),
        "definition": data.get("definition", ""),
        "examples": [
            examples[0] if len(examples) > 0 else "",
            examples[1] if len(examples) > 1 else "",
        ],
        "exampleDE": swiss(data.get("exampleDE", "")),
        "imageUrl": "",
        "difficulty": cefr_difficulty(data.get("difficulty")),
        "dateAdded": date.today().isoformat(),
        "notes": "",
        "category": category,
    })

    save_data(words, wiki, imgs)
    print(f"In words.js eingefuegt (id={new_id}).")
    build_xlsx.build()
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

    process_word(word_raw, category)
    print("Fertig.")


if __name__ == "__main__":
    main()
