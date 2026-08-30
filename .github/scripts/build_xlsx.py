"""
Generiert vokabeln.xlsx komplett aus words.js — words.js ist die einzige
Datenquelle ("Single Source of Truth"), die Excel ist ein Export.

Warum: Frueher schrieb der Bot parallel in beide Dateien; dabei entstand Drift
(die xlsx enthielt zeitweise mehr/andere Zeilen als das WORDS-Array). Durch das
Neu-Generieren bei jeder Aenderung koennen die beiden nie mehr auseinanderlaufen.

Spalte "Bild URL": feste Thumbnail-URL aus IMG_URLS (nur als Referenz — die App
liest Bilder direkt aus words.js).
"""

from openpyxl import Workbook

from words_data import ROOT, load_data

XLSX_FILE = ROOT / "vokabeln.xlsx"

HEADERS = [
    "Wort (Englisch)", "Übersetzung (Deutsch)", "Aussprache (IPA)", "Wortart",
    "Definition (Englisch)", "Beispielsatz 1", "Beispielsatz 2", "Bild URL",
    "Schwierigkeit", "Hinzugefügt", "Notizen", "Kategorie", "Beispielsatz DE",
]


def build():
    words, _wiki, imgs = load_data()
    wb = Workbook()
    ws = wb.active
    ws.title = "Vokabeln"
    ws.append(HEADERS)
    for w in words:
        examples = w.get("examples") or []
        ws.append([
            w.get("word", ""),
            w.get("translation", ""),
            w.get("pronunciation", ""),
            w.get("wordType", ""),
            w.get("definition", ""),
            examples[0] if len(examples) > 0 else "",
            examples[1] if len(examples) > 1 else "",
            imgs.get(str(w.get("word", "")).lower(), ""),
            w.get("difficulty", ""),
            w.get("dateAdded", ""),
            w.get("notes", ""),
            w.get("category", ""),
            w.get("exampleDE", ""),
        ])
    wb.save(XLSX_FILE)
    print(f"vokabeln.xlsx generiert: {len(words)} Woerter.")


if __name__ == "__main__":
    build()
