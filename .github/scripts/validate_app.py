"""
Validiert index.html vor jedem Deploy/Commit:
  1. Alle <script>-Bloecke sind syntaktisch gueltiges JavaScript (node --check).
  2. Das WORDS-Array ist parsebar, nicht leer, jede Zeile hat id/word/translation,
     keine doppelten ids, keine doppelten Woerter (normalisiert, ohne fuehrendes "to ").
  3. Die WIKI_TITLES-Map ist ein parsebares Objekt.
Exit-Code != 0 => der aufrufende Workflow bricht ab (kein Commit/Push).
Laeuft auf ubuntu-latest (node ist vorinstalliert) und lokal.
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
HTML = ROOT / "index.html"


def fail(msg: str):
    print("❌ VALIDIERUNG FEHLGESCHLAGEN: " + msg, file=sys.stderr)
    sys.exit(1)


def main():
    if not HTML.exists():
        fail("index.html nicht gefunden.")
    html = HTML.read_text(encoding="utf-8")

    # 1) JS-Syntax aller <script>-Bloecke
    scripts = re.findall(r"<script(?:\s[^>]*)?>(.*?)</script>", html, re.S)
    for i, s in enumerate(scripts):
        if not s.strip():
            continue
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
            f.write(s)
            tmp = f.name
        r = subprocess.run(["node", "--check", tmp], capture_output=True, text=True)
        if r.returncode != 0:
            fail(f"JS-Syntaxfehler im <script>-Block {i}:\n{r.stderr[:700]}")

    # 2)+3) WORDS / WIKI_TITLES per node parsen und pruefen
    checker = r"""
const fs=require('fs');
const h=fs.readFileSync(process.argv[2],'utf8');
function block(name,o,c){let s=h.indexOf(name);if(s<0)throw new Error(name+' nicht gefunden');let i=h.indexOf(o,s),d=0,e=-1;for(let j=i;j<h.length;j++){if(h[j]===o)d++;else if(h[j]===c){d--;if(d===0){e=j;break;}}}if(e<0)throw new Error('Ende von '+name+' nicht gefunden');return h.slice(i,e+1);}
let W,WT;
try{W=eval(block('const WORDS = [','[',']'));}catch(e){console.error('WORDS unparsebar: '+e.message);process.exit(2);}
try{WT=eval('('+block('const WIKI_TITLES','{','}')+')');}catch(e){console.error('WIKI_TITLES unparsebar: '+e.message);process.exit(2);}
if(!Array.isArray(W)||W.length===0){console.error('WORDS ist kein nicht-leeres Array');process.exit(2);}
if(typeof WT!=='object'||WT===null||Array.isArray(WT)){console.error('WIKI_TITLES ist kein Objekt');process.exit(2);}
const ids={},words={},probs=[];
for(const w of W){
  for(const f of ['id','word','translation']){ if(w[f]===undefined||w[f]===null||w[f]===''){ probs.push('Eintrag '+JSON.stringify(w.word||w.id||'?')+': Feld "'+f+'" fehlt'); } }
  if(ids[w.id]){ probs.push('Doppelte id: '+w.id); } ids[w.id]=1;
  const key=String(w.word||'').trim().toLowerCase();
  if(words[key]){ probs.push('Doppeltes Wort: '+w.word); } words[key]=1;
}
if(probs.length){ console.error(probs.slice(0,40).join('\n')); process.exit(2); }
console.log('OK: '+W.length+' Woerter, '+Object.keys(WT).length+' WIKI_TITLES, keine Dubletten, alle Pflichtfelder vorhanden.');
"""
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
        f.write(checker)
        cjs = f.name
    r = subprocess.run(["node", cjs, str(HTML)], capture_output=True, text=True)
    if r.stdout.strip():
        print(r.stdout.strip())
    if r.returncode != 0:
        fail(r.stderr.strip() or "WORDS/WIKI_TITLES-Pruefung fehlgeschlagen.")
    print("✅ index.html validiert.")


if __name__ == "__main__":
    main()
