"""
Gemeinsame Datenschicht fuer alle Bot-Skripte.

words.js enthaelt drei Konstanten (WORDS, WIKI_TITLES, IMG_URLS), deren Inhalte
striktes JSON sind (siehe Header von words.js). Diese Datei liest die Bloecke
als JSON ein und schreibt die komplette Datei kanonisch neu — kein Regex-
Gefrickel an einzelnen Stellen mehr: lesen → Datenstruktur aendern → speichern.
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA_FILE = ROOT / "words.js"

HEADER = """/* ═══════════════════════════════════════════════════════════════
   words.js — DATEN des English Trainers (kein Code!)
   ═══════════════════════════════════════════════════════════════
   Diese Datei wird vom ETA-Bot (.github/scripts/eta_process.py)
   und vom Bild-Resolver (resolve_images.py) automatisch gepflegt:
   die Skripte lesen die drei Bloecke als striktes JSON ein und
   schreiben sie komplett neu. Darum gilt:
   - KEINE Kommentare innerhalb der drei Bloecke
   - ein Eintrag pro Zeile, doppelte Anfuehrungszeichen (JSON)
   - deutsche Texte in Schweizer Rechtschreibung (ss statt ß)

   Enthaelt genau drei Konstanten:
   - WORDS        Vokabel-Datenbank (ein Objekt pro Wort)
   - WIKI_TITLES  Wort → Wikipedia-Artikel (Bildquelle fuer Nomen)
   - IMG_URLS     Wort (kleingeschrieben) → feste Thumbnail-URL

   vokabeln.xlsx wird aus dieser Datei generiert (build_xlsx.py).
   Die Logik der App liegt in app.js, das Design in styles.css.
   ═══════════════════════════════════════════════════════════════ */
"""


def _extract(text: str, marker: str, opener: str, closer: str) -> str:
    """Liefert den Block (inkl. Klammern) hinter `marker`."""
    start = text.index(marker) + len(marker)
    i = text.index(opener, start)
    depth = 0
    for j in range(i, len(text)):
        if text[j] == opener:
            depth += 1
        elif text[j] == closer:
            depth -= 1
            if depth == 0:
                return text[i:j + 1]
    raise ValueError(f"Ende von {marker.strip()} nicht gefunden.")


def load_data():
    """Liest words.js und liefert (words, wiki_titles, img_urls) als Python-Objekte."""
    text = DATA_FILE.read_text(encoding="utf-8")
    words = json.loads(_extract(text, "const WORDS =", "[", "]"))
    wiki = json.loads(_extract(text, "const WIKI_TITLES =", "{", "}"))
    imgs = json.loads(_extract(text, "const IMG_URLS =", "{", "}"))
    return words, wiki, imgs


def save_data(words, wiki, imgs):
    """Schreibt words.js komplett neu (kanonisches Format, ein Eintrag pro Zeile)."""
    word_lines = [json.dumps(w, ensure_ascii=False, separators=(",", ":")) for w in words]
    words_block = "const WORDS = [\n  " + ",\n  ".join(word_lines) + "\n];"

    def obj_block(name, d):
        lines = [
            f"  {json.dumps(k, ensure_ascii=False)}: {json.dumps(v, ensure_ascii=False)}"
            for k, v in d.items()
        ]
        return f"const {name} = {{\n" + ",\n".join(lines) + "\n};"

    out = (
        HEADER + "\n" + words_block + "\n\n"
        + obj_block("WIKI_TITLES", wiki) + "\n\n"
        + obj_block("IMG_URLS", imgs) + "\n"
    )
    DATA_FILE.write_text(out, encoding="utf-8")


def normalize_word(w: str) -> str:
    """Normalisiert ein Wort fuer den Dubletten-Vergleich (klein, ohne fuehrendes 'to ')."""
    if not w:
        return ""
    w = w.strip().lower()
    if w.startswith("to "):
        w = w[3:].strip()
    return w
