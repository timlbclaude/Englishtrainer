---
name: ETA-FIX - Bild eines bestehenden Worts erneuern
about: Wenn ein Wort kein Bild oder ein unpassendes Bild hat, kann der Bot es neu suchen
title: "ETA-FIX: "
labels: eta-fix
---

<!--
So gehts:
1. Hinter "ETA-FIX: " das englische Wort eintragen (genau so, wie es in der Wortliste steht).
2. Optional: einen Override-Suchbegriff mit Hashtag anhaengen, falls die Standardsuche schlechte Treffer liefert. Unterstriche werden zu Leerzeichen.

Beispiele:
   ETA-FIX: sugar bowl
   ETA-FIX: threshold #door_sill_stone
   ETA-FIX: tea towel #checkered_dishcloth

Der Bot sucht ein neues Bild auf Wikimedia Commons (Fallback: Wikipedia-Artikelbild),
ueberschreibt die imageUrl im WORDS-Array und in vokabeln.xlsx und schliesst das Issue.
-->
