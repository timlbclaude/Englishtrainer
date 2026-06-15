"""
ETA-Batch: verarbeitet einmal taeglich alle gesammelten Woerter aus neue_woerter.txt.

Format der Datei: ein Wort pro Zeile, optional mit Kategorie via '#', z.B.
    napkin
    spatula #Kitchen
    cliffhanger #TV
Zeilen, die mit '#' beginnen, sind Kommentare (Header) und werden ignoriert.

Ablauf:
1. Liest die Wort-Zeilen.
2. Verarbeitet jede ueber die zentrale process_word()-Pipeline (Claude + WIKI_TITLES + xlsx).
3. Erfolgreich aufgenommene UND bereits vorhandene Woerter werden aus der Datei entfernt.
   Woerter mit Fehler bleiben stehen und werden am naechsten Tag erneut versucht.
4. Schreibt neue_woerter.txt neu (nur Header + uebrige Woerter) und spiegelt index.html.

Wird vom Workflow eta-daily.yml per Cron (sowie manuell per workflow_dispatch) aufgerufen.
"""

import sys
from pathlib import Path

# Funktionen aus dem Issue-Prozessor wiederverwenden (DRY)
from eta_process import (
    ROOT,
    parse_word_and_category,
    process_word,
)

WORDS_FILE = ROOT / "neue_woerter.txt"


def is_comment(line: str) -> bool:
    return line.strip().startswith("#")


def main():
    if not WORDS_FILE.exists():
        print("neue_woerter.txt nicht gefunden - nichts zu tun.")
        return

    original = WORDS_FILE.read_text(encoding="utf-8")
    lines = original.splitlines()

    header_lines = [ln for ln in lines if is_comment(ln)]
    word_lines = [ln for ln in lines if ln.strip() and not is_comment(ln)]

    if not word_lines:
        print("Keine neuen Woerter in neue_woerter.txt.")
        return

    print(f"{len(word_lines)} Wort-Zeile(n) gefunden.")

    added = 0
    dup = 0
    remaining = []  # Zeilen, die wegen Fehler stehen bleiben

    for raw_line in word_lines:
        word, category = parse_word_and_category(raw_line.strip())
        if not word:
            continue
        try:
            status = process_word(word, category)
            if status == "added":
                added += 1
            elif status == "dup":
                dup += 1
            else:
                remaining.append(raw_line)
        except Exception as e:
            print(f"FEHLER bei '{raw_line.strip()}': {e}", file=sys.stderr)
            remaining.append(raw_line)

    # Datei neu schreiben: Header + nur die nicht-verarbeiteten Woerter
    new_content = "\n".join(header_lines).rstrip() + "\n\n"
    if remaining:
        new_content += "\n".join(remaining) + "\n"
    WORDS_FILE.write_text(new_content, encoding="utf-8")

    print(f"Batch fertig: {added} neu, {dup} Dubletten, {len(remaining)} offen (Fehler/Retry).")


if __name__ == "__main__":
    main()
