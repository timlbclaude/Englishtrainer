# English Trainer (ETA)

Persönlicher Englisch-Vokabeltrainer als PWA auf GitHub Pages: Spaced Repetition
in 12er-Runden, Karteikarten, Quiz (mit Hör-Modus), Lückentext, Tippmodus,
Wortliste mit Fotos, Streak/XP und Geräte-Sync über einen privaten GitHub-Gist.

## Architektur

Die App besteht aus vier klar getrennten Dateien — **Daten, Design, Logik und
Markup werden nie vermischt**:

| Datei | Inhalt | Wer schreibt sie? |
|---|---|---|
| `index.html` | nur Markup (Kopfzeile, Tabs, Modals) | Mensch/Claude |
| `styles.css` | alles Design, Token-basiert (→ [DESIGN.md](DESIGN.md)) | Mensch/Claude |
| `app.js` | alle Logik (Abschnitts-Inhaltsverzeichnis im Dateikopf) | Mensch/Claude |
| `words.js` | nur Daten: `WORDS`, `WIKI_TITLES`, `IMG_URLS` | **der Bot** |
| `sw.js` | Service Worker (Offline/PWA, Network-First) | Mensch/Claude |
| `vokabeln.xlsx` | Excel-Spiegel der Vokabeln | der Bot |

Vorteil der Trennung: Die Automation muss nur noch die kleine Datendatei
`words.js` anfassen — Code-Änderungen und Wort-Änderungen kommen sich nicht
mehr in die Quere.

## Wörter hinzufügen (ETA-Bot)

1. **App-Button (+)** oder GitHub-Issue mit Titel `ETA: <wort> [#Kategorie]`
2. Workflow `eta.yml` → `.github/scripts/eta_process.py`: fragt die Claude-API,
   sucht für Nomen ein Wikipedia-Bild, schreibt das Wort in `words.js` und
   `vokabeln.xlsx`, validiert, committet, schliesst das Issue.
3. Alternativ täglich gesammelt: Wörter in `neue_woerter.txt` → `eta-daily.yml`.
4. `resolve-images.yml` löst offene Bild-URLs auf und schreibt sie fest in
   `words.js` (`IMG_URLS`).

## Qualitätssicherung (läuft automatisch)

- `validate.yml` → `validate_app.py`: JS-Syntax aller Dateien, WORDS/WIKI_TITLES/
  IMG_URLS parsebar & konsistent, keine Dubletten, CEFR-Stufen gültig.
  Läuft auch **vor jedem Bot-Commit** (bricht bei Fehlern ab).
- `app-tests.yml` → `app_smoke.js`: echter Chromium-Test im Handy-Format —
  alle Modi, beide Lernrichtungen, Fehler-Wiedervorlage, Hör-Modus, Heatmap.

## Regeln für Änderungen

1. **Design** nur in `styles.css`, Farben nur über Tokens (siehe DESIGN.md).
2. **Daten** nur in `words.js` (und xlsx) — von Hand nur im Notfall.
3. **Keine Patch-Blöcke mehr anhängen**: Änderungen direkt in `app.js` /
   `styles.css` einarbeiten, damit keine neuen Override-Schichten entstehen.
   (Der alte Workflow `apply-eta-patch.yml` hängt Patches ans Ende von
   `index.html` — nur noch für Notfälle, danach bitte einarbeiten.)
4. Nach jeder Änderung: `python3 .github/scripts/validate_app.py` — der Push
   triggert zusätzlich Validierung + Smoke-Test auf GitHub.
5. `sw.js`: bei Änderungen an App-Dateien die `CACHE`-Version hochzählen,
   sonst sehen installierte PWAs die Änderung erst verspätet.

## Lernfortschritt & Sync

Fortschritt (SRS-Stufen, XP, Streak) liegt im `localStorage` und synchronisiert
über einen privaten GitHub-Gist (Einrichtung: Zahnrad → Geräte-Sync). Der
Token braucht Gists R/W (Account) + Issues R/W (Repo, für den +-Button) und
läuft standardmässig nach 90 Tagen ab — bei 401-Fehlern zuerst daran denken.
