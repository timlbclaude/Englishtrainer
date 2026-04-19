"""
ETA-Prozessor: verarbeitet ein GitHub-Issue mit Titel "ETA: <wort> [#Kategorie]",
ruft die Claude API auf, sucht bei Nomen ein Bild auf Wikimedia Commons und
schreibt das Ergebnis in index.html (WORDS-Array) sowie in vokabeln.xlsx.
"""

import json
import os
import re
import sys
import time
from datetime import date
from pathlib import Path

import requests
from anthropic import Anthropic
from openpyxl import load_workbook

# ---------- Konfiguration ----------

ROOT = Path(__file__).resolve().parents[2]
HTML_FILE = ROOT / "index.html"
XLSX_FILE = ROOT / "vokabeln.xlsx"

CLAUDE_MODEL = "claude-sonnet-4-5"  # schnell & guenstig, gute Qualitaet

SYSTEM_PROMPT = """Du bist ein Englisch-Lehrer-Assistent. Der Nutzer nennt dir ein englisches Wort.
Liefere ein JSON-Objekt mit exakt diesen Feldern:
- "word": das Wort in Kleinbuchstaben (bei Eigennamen Grossschreibung lassen)
- "translation": Deutsche Uebersetzung (max. 4 Woerter)
- "pronunciation": IPA-Lautschrift in Slashes, z.B. "/brik/"
- "wordType": Einer von "Nomen", "Verb", "Adjektiv", "Adverb", "Praeposition", "Konjunktion", "Phrase"
- "definition": Kurze englische Definition (max. 15 Woerter)
- "examples": Array mit genau 2 einfachen englischen Beispielsaetzen
- "difficulty": 1 (einfach), 2 (mittel) oder 3 (schwer)
- "imageKeyword": Wenn wordType = "Nomen", ein englisches Suchwort fuer ein generisches Wikimedia-Commons-Bild (z.B. "Brick wall"). Sonst leerer String.

Antworte NUR mit dem JSON-Objekt, ohne Code-Fence, ohne Erklaerung."""


# ---------- Hilfsfunktionen ----------

def parse_issue_title(title: str):
    """ETA: brick #TV  ->  ("brick", "TV")"""
    body = title[len("ETA:"):].strip() if title.lower().startswith("eta:") else title
    cat_match = re.search(r"#(\S+)", body)
    category = cat_match.group(1) if cat_match else "Allgemein"
    word = re.sub(r"#\S+", "", body).strip().strip(",").strip()
    return word, category


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
            "srnamespace": "6",  # File-Namespace
            "srlimit": "5",
        }
        r = requests.get(api, params=params, headers={"User-Agent": "ETA-Bot/1.0"}, timeout=15)
        r.raise_for_status()
        hits = r.json().get("query", {}).get("search", [])
        for h in hits:
            title = h.get("title", "")
            if title.lower().startswith("file:"):
                filename = title[5:]
                # Nur "einfache" Dateitypen akzeptieren
                if re.search(r"\.(jpg|jpeg|png|gif|webp)$", filename, re.I):
                    safe = filename.replace(" ", "_")
                    return f"https://commons.wikimedia.org/wiki/Special:FilePath/{safe}?width=400"
    except Exception as e:
        print(f"Wikimedia-Lookup fehlgeschlagen: {e}", file=sys.stderr)
    return ""


def next_word_id(html: str) -> int:
    ids = [int(m) for m in re.findall(r'"id"\s*:\s*(\d+)', html)]
    return (max(ids) + 1) if ids else 1


def js_escape(s: str) -> str:
    if s is None:
        s = ""
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()


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

    # WORDS-Array-Ende finden: das schliessende "]" des Arrays
    # Wir suchen den ersten Treffer fuer "const WORDS = [" und laufen dann zum passenden "]".
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
    # i zeigt auf das schliessende "]"
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


# ---------- Main ----------

def main():
    title = os.environ.get("ISSUE_TITLE", "")
    if not title.lower().startswith("eta:"):
        print("Kein ETA-Issue, breche ab.")
        return

    word_raw, category = parse_issue_title(title)
    if not word_raw:
        print("Kein Wort im Issue-Titel gefunden.")
        sys.exit(1)

    print(f"Verarbeite Wort: '{word_raw}' (Kategorie: {category})")

    data = ask_claude(word_raw)
    print("Claude-Antwort:", data)

    # Bild fuer Nomen
    if data.get("wordType") == "Nomen":
        keyword = data.get("imageKeyword") or data.get("word", "")
        data["imageUrl"] = find_wikimedia_image(keyword)
        print(f"Bild-URL: {data['imageUrl']}")
    else:
        data["imageUrl"] = ""

    append_word_to_html(data, category)
    append_word_to_xlsx(data, category)
    print("Fertig.")


if __name__ == "__main__":
    main()
