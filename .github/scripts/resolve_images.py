"""Bild-Resolver: loest Wikipedia-Thumbnails fuer alle WIKI_TITLES-Eintraege auf
und schreibt sie fest in die IMG_URLS-Map von index.html.

Warum: Fest eingebaute URLs erscheinen sofort beim App-Start (kein API-Warten),
funktionieren offline ueber den Browser-Cache und sind unabhaengig von
Laufzeit-Aenderungen der Wikipedia-API. Die Laufzeit-Pipeline (prefetchImages)
bleibt als Fallback fuer Eintraege ohne aufgeloeste URL bestehen.

Laeuft im GitHub-Workflow resolve-images.yml (taeglich + manuell).
Idempotent: bereits aufgeloeste Keys werden uebersprungen.
"""

import re
import sys
import time
import urllib.parse
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[2]
HTML_FILE = ROOT / "index.html"
UA = {"User-Agent": "ETA-Bot/1.0 (English Trainer; image resolver)"}


def extract_block(html: str, marker: str, open_ch: str, close_ch: str):
    """Liefert (start_index_nach_marker, ende_index, blockinhalt)."""
    m = re.search(marker, html)
    if not m:
        return None
    start = html.index(open_ch, m.end() - 1)
    depth = 0
    i = start
    while i < len(html):
        c = html[i]
        if c == open_ch:
            depth += 1
        elif c == close_ch:
            depth -= 1
            if depth == 0:
                break
        i += 1
    return (start + 1, i, html[start + 1:i])


def parse_map(block: str):
    """Parst 'Key':'Value'-Paare aus einem JS-Objektliteral (einfache Quotes)."""
    return re.findall(r"'((?:[^'\\]|\\.)*)'\s*:\s*'((?:[^'\\]|\\.)*)'", block)


def fetch_thumb(title: str) -> str:
    """Holt das Thumbnail mit Retry/Backoff — GitHub-Runner-IPs werden von
    Wikipedia gelegentlich gedrosselt (429), ein zweiter Versuch reicht meist."""
    url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(
        title.strip().replace(" ", "_")
    )
    for attempt in range(4):
        try:
            r = requests.get(url, headers=UA, timeout=15)
            if r.status_code == 200:
                d = r.json()
                if d.get("type") == "disambiguation":
                    return ""
                return d.get("thumbnail", {}).get("source", "")
            if r.status_code in (429, 500, 502, 503, 504):
                wait = float(r.headers.get("Retry-After", 0) or 0) or (3.0 * (attempt + 1))
                print(f"  … {title}: HTTP {r.status_code}, warte {wait:.0f}s (Versuch {attempt+1}/4)")
                time.sleep(wait)
                continue
            return ""  # 404 etc.: Artikel existiert nicht -> kein Retry
        except Exception as e:
            print(f"  Fehler bei '{title}': {e} (Versuch {attempt+1}/4)", file=sys.stderr)
            time.sleep(2.0 * (attempt + 1))
    return ""


def js_escape_single(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'").strip()


def main():
    html = HTML_FILE.read_text(encoding="utf-8")

    wiki = extract_block(html, r"const\s+WIKI_TITLES\s*=\s*\{", "{", "}")
    imgs = extract_block(html, r"const\s+IMG_URLS\s*=\s*\{", "{", "}")
    if not wiki or not imgs:
        print("WIKI_TITLES oder IMG_URLS nicht gefunden — Abbruch.")
        sys.exit(1)

    titles = parse_map(wiki[2])
    existing = {k.lower() for k, _ in parse_map(imgs[2])}
    todo = [(w, t) for w, t in titles if w.lower() not in existing]
    print(f"WIKI_TITLES: {len(titles)} · bereits aufgeloest: {len(existing)} · offen: {len(todo)}")
    if not todo:
        print("Nichts zu tun.")
        return

    new_entries = []
    for word, title in todo:
        thumb = fetch_thumb(title)
        if thumb:
            new_entries.append((word.lower(), thumb))
            print(f"  ✓ {word} -> {thumb[:90]}")
        else:
            print(f"  – {word}: kein Thumbnail ({title})")
        time.sleep(0.5)  # hoefliches Rate-Limiting

    if not new_entries:
        print("Keine neuen URLs aufgeloest.")
        return

    insert = "".join(
        f"\n  '{js_escape_single(k)}':'{js_escape_single(u)}',"
        for k, u in new_entries
    )
    pos = imgs[0]
    html = html[:pos] + insert + html[pos:]
    HTML_FILE.write_text(html, encoding="utf-8")
    print(f"{len(new_entries)} Bild-URLs fest eingebaut.")


if __name__ == "__main__":
    main()
