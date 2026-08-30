"""Bild-Resolver: loest Wikipedia-Thumbnails fuer alle WIKI_TITLES-Eintraege auf
und schreibt sie fest in die IMG_URLS-Map von words.js.

Warum: Fest eingebaute URLs erscheinen sofort beim App-Start (kein API-Warten),
funktionieren offline ueber den Browser-Cache und sind unabhaengig von
Laufzeit-Aenderungen der Wikipedia-API. Die Laufzeit-Pipeline (prefetchImages)
bleibt als Fallback fuer Eintraege ohne aufgeloeste URL bestehen.

Laeuft im GitHub-Workflow resolve-images.yml (taeglich + manuell).
Idempotent: bereits aufgeloeste Keys werden uebersprungen.
Datenzugriff ueber words_data.py (striktes JSON, kein Regex).
"""

import sys
import time
import urllib.parse

import requests

from words_data import load_data, save_data

UA = {"User-Agent": "ETA-Bot/1.0 (English Trainer; image resolver)"}


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


def main():
    words, wiki, imgs = load_data()
    todo = [(w, t) for w, t in wiki.items() if w.lower() not in imgs]
    print(f"WIKI_TITLES: {len(wiki)} · bereits aufgeloest: {len(imgs)} · offen: {len(todo)}")
    if not todo:
        print("Nichts zu tun.")
        return

    resolved = 0
    for word, title in todo:
        thumb = fetch_thumb(title)
        if thumb:
            imgs[word.lower()] = thumb
            resolved += 1
            print(f"  ✓ {word} -> {thumb[:90]}")
        else:
            print(f"  – {word}: kein Thumbnail ({title})")
        time.sleep(0.5)  # hoefliches Rate-Limiting

    if not resolved:
        print("Keine neuen URLs aufgeloest.")
        return

    save_data(words, wiki, imgs)
    print(f"{resolved} Bild-URLs fest eingebaut.")


if __name__ == "__main__":
    main()
