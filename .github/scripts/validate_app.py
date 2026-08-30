"""
Validiert die App-Dateien vor jedem Deploy/Commit:
  1. words.js und app.js sind syntaktisch gueltiges JavaScript (node --check),
     ebenso alle etwaigen <script>-Bloecke in index.html.
  2. Das WORDS-Array (words.js) ist parsebar, nicht leer, jede Zeile hat
     id/word/translation, keine doppelten ids, keine doppelten Woerter
     (normalisiert, ohne fuehrendes "to ").
  3. Die WIKI_TITLES-Map ist ein parsebares Objekt.
  4. Bild-Verkabelung: jeder WIKI_TITLES-Key gehoert (case-insensitiv) zu einem
     Wort im WORDS-Array; IMG_URLS ist parsebar, Keys kleingeschrieben, jeder
     Key gehoert zu einem WIKI_TITLES-Eintrag; URLs sind https-Wikimedia-Links.
  5. difficulty ist eine CEFR-Stufe (A1-C2).
  6. index.html referenziert styles.css, words.js und app.js.
Exit-Code != 0 => der aufrufende Workflow bricht ab (kein Commit/Push).
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
HTML = ROOT / "index.html"
WORDS_JS = ROOT / "words.js"
APP_JS = ROOT / "app.js"


def fail(msg: str):
    print("❌ VALIDIERUNG FEHLGESCHLAGEN: " + msg, file=sys.stderr)
    sys.exit(1)


def node_check(path: Path):
    r = subprocess.run(["node", "--check", str(path)], capture_output=True, text=True)
    if r.returncode != 0:
        fail(f"JS-Syntaxfehler in {path.name}:\n{r.stderr[:700]}")


def main():
    for f in (HTML, WORDS_JS, APP_JS):
        if not f.exists():
            fail(f"{f.name} nicht gefunden.")

    # 1) JS-Syntax
    node_check(WORDS_JS)
    node_check(APP_JS)
    html = HTML.read_text(encoding="utf-8")
    scripts = re.findall(r"<script(?:\s[^>]*)?>(.*?)</script>", html, re.S)
    for i, s in enumerate(scripts):
        if not s.strip():
            continue
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
            f.write(s)
            tmp = f.name
        r = subprocess.run(["node", "--check", tmp], capture_output=True, text=True)
        if r.returncode != 0:
            fail(f"JS-Syntaxfehler im <script>-Block {i} von index.html:\n{r.stderr[:700]}")

    # 6) Datei-Referenzen
    for ref in ("styles.css", "words.js", "app.js"):
        if ref not in html:
            fail(f"index.html referenziert {ref} nicht.")

    # 2)-5) WORDS / WIKI_TITLES / IMG_URLS per node parsen und pruefen
    checker = r"""
const fs=require('fs');
const h=fs.readFileSync(process.argv[2],'utf8');
function block(name,o,c){let s=h.indexOf(name);if(s<0)throw new Error(name+' nicht gefunden');let i=h.indexOf(o,s),d=0,e=-1;for(let j=i;j<h.length;j++){if(h[j]===o)d++;else if(h[j]===c){d--;if(d===0){e=j;break;}}}if(e<0)throw new Error('Ende von '+name+' nicht gefunden');return h.slice(i,e+1);}
let W,WT,IU;
try{W=eval(block('const WORDS = [','[',']'));}catch(e){console.error('WORDS unparsebar: '+e.message);process.exit(2);}
try{WT=eval('('+block('const WIKI_TITLES','{','}')+')');}catch(e){console.error('WIKI_TITLES unparsebar: '+e.message);process.exit(2);}
try{IU=eval('('+block('const IMG_URLS','{','}')+')');}catch(e){console.error('IMG_URLS unparsebar: '+e.message);process.exit(2);}
if(!Array.isArray(W)||W.length===0){console.error('WORDS ist kein nicht-leeres Array');process.exit(2);}
if(typeof WT!=='object'||WT===null||Array.isArray(WT)){console.error('WIKI_TITLES ist kein Objekt');process.exit(2);}
if(typeof IU!=='object'||IU===null||Array.isArray(IU)){console.error('IMG_URLS ist kein Objekt');process.exit(2);}
const ids={},words={},probs=[];
const CEFR={A1:1,A2:1,B1:1,B2:1,C1:1,C2:1};
for(const w of W){
  for(const f of ['id','word','translation']){ if(w[f]===undefined||w[f]===null||w[f]===''){ probs.push('Eintrag '+JSON.stringify(w.word||w.id||'?')+': Feld "'+f+'" fehlt'); } }
  if(ids[w.id]){ probs.push('Doppelte id: '+w.id); } ids[w.id]=1;
  const key=String(w.word||'').trim().toLowerCase();
  if(words[key]){ probs.push('Doppeltes Wort: '+w.word); } words[key]=1;
  if(!CEFR[String(w.difficulty||'').toUpperCase()]){ probs.push('Keine CEFR-Stufe bei "'+w.word+'": '+JSON.stringify(w.difficulty)); }
}
const wtLower={};
for(const k of Object.keys(WT)){
  const lk=k.toLowerCase();
  if(!words[lk]){ probs.push('WIKI_TITLES-Key ohne Wort im WORDS-Array: "'+k+'"'); }
  wtLower[lk]=1;
}
for(const k of Object.keys(IU)){
  if(k!==k.toLowerCase()){ probs.push('IMG_URLS-Key nicht kleingeschrieben: "'+k+'"'); }
  if(!wtLower[k]){ probs.push('IMG_URLS-Key ohne WIKI_TITLES-Eintrag: "'+k+'"'); }
  const u=String(IU[k]||'');
  if(!/^https:\/\/upload\.wikimedia\.org\//.test(u)){ probs.push('IMG_URLS["'+k+'"]: keine Wikimedia-https-URL'); }
}
if(probs.length){ console.error(probs.slice(0,40).join('\n')); process.exit(2); }
console.log('OK: '+W.length+' Woerter, '+Object.keys(WT).length+' WIKI_TITLES, '+Object.keys(IU).length+' feste Bild-URLs, Bild-Verkabelung konsistent, CEFR-Stufen gueltig.');
"""
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
        f.write(checker)
        cjs = f.name
    r = subprocess.run(["node", cjs, str(WORDS_JS)], capture_output=True, text=True)
    if r.stdout.strip():
        print(r.stdout.strip())
    if r.returncode != 0:
        fail(r.stderr.strip() or "WORDS/WIKI_TITLES-Pruefung fehlgeschlagen.")
    print("✅ App-Dateien validiert (index.html, styles.css, words.js, app.js).")


if __name__ == "__main__":
    main()
