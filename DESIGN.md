# DESIGN.md — Design-System des English Trainers

Alle Farben, Radien, Schatten und Verläufe sind als **Design-Tokens** (CSS Custom
Properties) definiert. Es gibt genau zwei Paletten: `styles.css → :root` (hell)
und `styles.css → body.dark` (dunkel, Standard). **Neue Styles verwenden nie
Hex-Farben direkt, sondern immer `var(--token)`** — dann funktioniert jedes neue
Element automatisch in beiden Themes.

## Farb-Tokens

| Token | Hell | Dunkel | Verwendung |
|---|---|---|---|
| `--primary` | `#4f46e5` | `#7C8CFF` | Markenfarbe: aktive Elemente, Links, Ringe |
| `--primary2` | `#6366f1` | `#5965F0` | zweiter Verlaufston (Buttons) |
| `--primary-soft` | `#818cf8` | `#5EE3D6` | Akzent (Cyan im Dark-Mode), Pills, Wochenpunkte |
| `--primary-bg` | Indigo 12 % | Primary 13 % | dezente Flächen hinter Primärfarbe |
| `--ok` / `--ok-bg` / `--ok-text` | Grün-Familie | Grün-Familie | richtig, gemeistert, Erfolg |
| `--err` / `--err-bg` / `--err-text` | Rot-Familie | Koralle-Familie | falsch, fällig, Gefahr |
| `--warn` / `--warn-bg` / `--warn-text` | Amber-Familie | Amber-Familie | Hinweise, "In Bearbeitung" |
| `--bg` | `#f8fafc` | `#0B0F17` | Seitenhintergrund |
| `--card` | `#ffffff` | `#141926` | Karten, Sheets, Modals |
| `--card-hover` | `#fafbff` | `#1B2233` | Hover-Flächen, Sekundär-Buttons |
| `--text` / `--text-soft` / `--muted` | Slate-Stufen | Hell-Stufen | Text-Hierarchie (stark → schwach) |
| `--border` / `--border-strong` | Grau-Stufen | Blau-Grau-Stufen | Rahmen, Trennlinien |
| `--nav-bg` | Weiss 90 % | Dunkel 92 % | halbtransparente Leisten |
| `--nav-solid` | `#ffffff` | `#10151F` | voll deckende Tab-Leiste/Kopfzeile (Mobile) |

Halbtransparente Varianten werden aus den Tokens abgeleitet, nicht neu erfunden:
`color-mix(in srgb, var(--primary) 18%, transparent)`.

## Verläufe, Radien, Schatten

| Token | Wert | Verwendung |
|---|---|---|
| `--grad-primary` | `linear-gradient(135deg, var(--primary2), var(--primary))` | alle Primär-Buttons, CTA, FAB |
| `--radius-sm` / `--radius` / `--radius-lg` / `--radius-full` | 10 / 14 / 18 px / Pille | Inputs · Karten · grosse Karten · Chips |
| `--sh-sm` / `--sh` / `--sh-lg` | klein / mittel / gross | Karten-Schatten nach Gewicht |

## Typografie

Schrift: **Inter** (Google Fonts), Fallback `'Segoe UI', system-ui, sans-serif`.
Lautschrift (IPA) immer in Monospace: `ui-monospace, 'SF Mono', Menlo, monospace`.
Überschriften-Labels: 9–11 px, `font-weight:800`, `letter-spacing ≈ 1px`, Grossbuchstaben.
Grosse Wörter (Karteikarte, Quiz): `font-weight:800`, negatives `letter-spacing`.

## Bewusste Ausnahmen (dokumentierte Hex-Werte)

- **Kategorie-Verläufe der Bild-Platzhalter** (`.v3-ph[data-cat=…]`): je Kategorie
  ein eigener dekorativer Verlauf (Reisen = Blau/Cyan, Kitchen = Braun/Amber,
  TV = Violett/Pink, Allgemein = Indigo/Slate). Neue Kategorie → neue Regel dort.
- **Lernstufen-Farbskala** (`lvColors` in app.js, Fortschritts-Ansicht) und der
  **Ring-Verlauf** (`#7C8CFF → #5EE3D6` in `ringHTML`): feste Skalen in JS-SVG,
  identisch in beiden Themes.
- **Token-Paletten selbst** in `:root` / `body.dark` — der einzige Ort, an dem
  neue Hex-Werte entstehen dürfen.

## Regeln für neue UI

1. Farben nur über Tokens; fehlt ein Ton, zuerst Token in beiden Paletten anlegen.
2. Interaktive Flächen: `--card` + `--border`, aktiv `--primary` + `--primary-bg`.
3. Buttons: primär `var(--grad-primary)` + weisser Text; sekundär `--card-hover` + `--border`.
4. Sheets (von unten): `border-radius: 22px 22px 0 0`, Handle-Strich, max-width 540–560 px.
5. Mobile zuerst: Touch-Ziele ≥ 44 px, fixe Leisten mit `env(safe-area-inset-*)`.
