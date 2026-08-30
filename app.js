/* ═══════════════════════════════════════════════════════════════
   app.js — LOGIK des English Trainers
   ═══════════════════════════════════════════════════════════════
   Struktur (von oben nach unten):
     1. Icons & Helfer            8. Quiz (Multiple Choice, Hör-Modus)
     2. App-Zustand               9. Lückentext
     3. Bilder (Wikipedia)       10. Runden-Auswertung
     4. SRS (Spaced Repetition)  11. Wortliste
     5. Stats & Sync (Gist)      12. Tippmodus & Schwierige Wörter
     6. Navigation (setMode)     13. Einstellungen, Fortschritt, Onboarding
     7. Heute-Screen & Training  14. Theme, Wort-hinzufügen, Start

   Daten liegen in words.js (WORDS, WIKI_TITLES, IMG_URLS),
   das Design in styles.css — Farben/Radien NUR über CSS-Tokens
   (siehe DESIGN.md).
   ═══════════════════════════════════════════════════════════════ */

/* ── 1. SVG-Icons & Helfer ── */
const ICON = {
  today:   '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  train:   '<path d="M9.5 3a3 3 0 0 0-3 3v.5A3 3 0 0 0 4 9.5v1a3 3 0 0 0 1 5.7V18a3 3 0 0 0 5.5 1.7M14.5 3a3 3 0 0 1 3 3v.5A3 3 0 0 1 20 9.5v1a3 3 0 0 1-1 5.7V18a3 3 0 0 1-5.5 1.7M12 4v17"/>',
  flash:   '<path d="M12 3 2 8l10 5 10-5-10-5ZM2 16l10 5 10-5M2 12l10 5 10-5"/>',
  quiz:    '<path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
  fill:    '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/>',
  list:    '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  search:  '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>',
  flame:   '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.4 0 2.6-1 2.9-2.4.4-2-1.4-3.6-1.4-3.6S15 12 15 9.5c0-3-3-5.5-3-5.5s.5 4-3 6c-1.7 1-2.5 2.8-2.5 4.5Z"/>',
  moon:    '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
  sun:     '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
  play:    '<path d="M5 3v18l15-9L5 3Z" fill="currentColor"/>',
  cloud:   '<path d="M18 10h-1.3A7 7 0 1 0 5 16.7"/><path d="M21 14a3 3 0 0 0-3-3h-3.5A5 5 0 1 0 8 17h10a3 3 0 0 0 3-3Z"/>',
  chevronRight: '<path d="M9 18l6-6-6-6"/>',
  layers:  '<path d="M12 3 2 8l10 5 10-5-10-5ZM2 16l10 5 10-5M2 12l10 5 10-5"/>',
  check:   '<path d="M20 6 9 17l-5-5"/>',
  x:       '<path d="M18 6 6 18M6 6l12 12"/>',
  trending:'<path d="M23 6 13.5 15.5l-5-5L1 18M17 6h6v6"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  info:    '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
};
function svg(name, size, w){
  return '<svg width="'+(size||20)+'" height="'+(size||20)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.8)+'" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">'+(ICON[name]||'')+'</svg>';
}
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }


/* ═══════════════════════════════════════════════
   App-Zustand
   ═══════════════════════════════════════════════ */
let mode = 'today';
let deck = [];
// ── Kategorie-Filter (2026-06-23): gilt für Karteikarten/Quiz/Lückentext ──
let catFilter = 'all';
try { catFilter = localStorage.getItem('etCatFilter') || 'all'; } catch(e){}
function poolWords(){ return catFilter==='all' ? WORDS : WORDS.filter(w => (w.category||'Allgemein')===catFilter); }
function catCounts(){ const m={}; WORDS.forEach(w=>{ const c=w.category||'Allgemein'; m[c]=(m[c]||0)+1; }); return m; }
function catLabel(c){ return c==='all' ? 'Alle' : (c==='—' ? 'Sonstige' : c); }
function categoryChipsHTML(){
  const counts=catCounts();
  const cats=Object.keys(counts).sort((a,b)=>counts[b]-counts[a]);
  const chip=(c,label,n)=>`<button class="cat-chip${catFilter===c?' active':''}" onclick="setCatFilter('${c}')">${label}<span class="cat-chip-n">${n}</span></button>`;
  let html=chip('all','Alle',WORDS.length);
  cats.forEach(c=>{ html+=chip(c,catLabel(c),counts[c]); });
  return `<div class="cat-chip-row">${html}</div>`;
}
function setCatFilter(c){
  catFilter=c; quizChipsOpen=false; try{ localStorage.setItem('etCatFilter',c); }catch(e){}
  idx=0; flipped=false; quizAnswered=false; fillChecked=false;
  if(mode==='flash'){ flashShowPicker=true; deck=shuffle(poolWords()); }
  else if(mode==='quiz'||mode==='fill'){ deck=buildRoundDeck(); if(typeof resetRound==='function') resetRound(); }
  render();
}
let idx = 0;
let flipped = false;
let correct = 0;
let incorrect = 0;
let quizAnswered = false;
let quizChoices = [];
let quizCorrectIdx = 0;
let fillChecked = false;
// 10er-Runden für Quiz und Lückentext
const ROUND_SIZE = 10;
// Karteikarten Rundenwahl
let flashRoundSize = 20;
let flashShowPicker = true;
// Quiz Auto-Weiter Timer
let quizAutoTimer = null;
let learnDir = 'en-de'; // 'en-de' | 'de-en' — gilt für alle Modi
let roundCorrect = 0;
let roundWrongWords = []; // Wort-Objekte aus dieser Runde, die falsch beantwortet wurden
let combo = 0;            // aktuelle Streak innerhalb der Runde
let bestComboInRound = 0;
let roundStartTs = 0;
const CATEGORIES = ['TV', 'Books', 'Kitchen/Cooking'];
let listFilterType = 'Alle';
let listFilterCat  = 'Alle';
let listSearch     = '';
let listOpen = {};

function catBadgeClass(cat){
  if(cat==='TV') return 'badge-cat-TV';
  if(cat==='Books') return 'badge-cat-Books';
  if(cat==='Kitchen/Cooking') return 'badge-cat-Kitchen';
  if(cat==='Reisen') return 'badge-cat-Reisen';
  return 'badge-cat-none';
}

const typeIcon = {Nomen:'📦',Verb:'⚡',Adjektiv:'🎨',Adverb:'💫'};

function diffColor(d){ return ['A1','A2'].includes(d)?'badge-A1':['B1','B2'].includes(d)?'badge-B1':'badge-C1'; }
function icon(w){ return typeIcon[w.wordType]||'📝'; }

function shuffle(arr){ return [...arr].sort(()=>Math.random()-.5); }


/* ── P1-FIX (2026-08-01): Case-insensitiver Bild-Zugriff ──
   Die v2.5-Wort-Normalisierung schreibt w.word zur Laufzeit klein
   ('Threshold' → 'threshold'). WIKI_TITLES hat grossgeschriebene Keys →
   ohne diesen Fix scheitern 94/95 Lookups und es erscheinen keine Bilder. */
const WIKI_TITLES_CI = {};
for (const _k in WIKI_TITLES) WIKI_TITLES_CI[_k.toLowerCase()] = WIKI_TITLES[_k];
function wikiTitleFor(word){
  if(!word) return '';
  return WIKI_TITLES[word] || WIKI_TITLES_CI[String(word).toLowerCase()] || '';
}
function imgKey(word){ return String(word||'').toLowerCase(); }


// Bild-Cache aus localStorage laden (für schnelles Wiederöffnen)
let imageCache = {};
try { imageCache = JSON.parse(localStorage.getItem('etImageCache') || '{}'); } catch(e) {}
// Migration: alte kaputte Einträge entsorgen
// - Special:FilePath: unzuverlässige Redirects
// - /400px-: nicht-existierende Wikimedia-Thumbnail-Grösse (liefert "Wikimedia Error" 404)
try {
  let cleaned = 0;
  for(const k of Object.keys(imageCache)){
    const v = imageCache[k];
    if(typeof v === 'string' && (v.includes('Special:FilePath') || v.includes('/400px-'))){
      delete imageCache[k]; cleaned++;
    }
  }
  // P1-FIX: Cache-Keys auf Kleinschreibung migrieren (einmalig)
  for(const k of Object.keys(imageCache)){
    const lk = k.toLowerCase();
    if(lk !== k){ if(!imageCache[lk]) imageCache[lk] = imageCache[k]; delete imageCache[k]; cleaned++; }
  }
  if(cleaned){ localStorage.setItem('etImageCache', JSON.stringify(imageCache)); console.log('[Bilder] '+cleaned+' Cache-Einträge migriert/entfernt'); }
} catch(e) {}

function getImg(w){
  const url = w.imageUrl || '';
  // Special:FilePath-URLs sind unzuverlässige Redirects → API-Cache bevorzugen
  if(url && !url.includes('Special:FilePath')) return url;
  const k = imgKey(w.word);
  // 1. Fest eingebaute URL (P3, sofort verfügbar) → 2. Laufzeit-Cache
  return IMG_URLS[k] || imageCache[k] || '';
}

async function fetchWikiImage(word){
  const title = wikiTitleFor(word);   // P1-FIX: case-insensitiv
  if(!title) return '';
  try {
    // Wikipedia REST-API (CORS-frei). User-Agent wird vom Browser gesetzt;
    // ein eigener User-Agent-Header ist im Browser nicht erlaubt.
    const r = await fetch(
      'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title)
    );
    if(!r.ok){ console.warn('[Bilder] API-Fehler', title, r.status); return ''; }
    const d = await r.json();
    let url = (d.thumbnail && d.thumbnail.source) ? d.thumbnail.source : '';
    // Grösse NICHT umschreiben — Wikimedia generiert nur bestimmte Thumb-Grössen,
    // beliebige /<N>px- URLs liefern 'Wikimedia Error' (404). API-URL as-is verwenden.
    if(url){
      imageCache[imgKey(word)] = url;   // P1-FIX: Key normalisiert
      try { localStorage.setItem('etImageCache', JSON.stringify(imageCache)); } catch(e) {}
    }
    return url;
  } catch(e){ console.warn('[Bilder] Netzwerkfehler', word, e); return ''; }
}

async function prefetchImages(){
  // Nur Wörter holen, die weder eine feste URL noch einen Cache-Eintrag haben
  const missing = WORDS.filter(w =>
    (!w.imageUrl || w.imageUrl.includes('Special:FilePath')) &&
    wikiTitleFor(w.word) && !IMG_URLS[imgKey(w.word)] && !imageCache[imgKey(w.word)]);
  if(!missing.length) return;
  // P1-FIX: parallel in 4er-Gruppen statt streng nacheinander (95 Bilder: >60s → ~8s)
  const BATCH = 4;
  let loaded = 0, sinceRender = 0;
  for(let i = 0; i < missing.length; i += BATCH){
    const urls = await Promise.all(missing.slice(i, i+BATCH).map(w => fetchWikiImage(w.word)));
    const ok = urls.filter(Boolean).length;
    loaded += ok; sinceRender += ok;
    if(sinceRender >= 8){ sinceRender = 0; try { render(); } catch(e){} }
    await new Promise(res => setTimeout(res, 120)); // höfliches Rate-Limiting zwischen Gruppen
  }
  if(loaded) try { render(); } catch(e){} // Finale Aktualisierung
}


function speakWord(text, lang){
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  // v3.3: Deutsche Wörter (z. B. Fragen in DE→EN) mit deutscher Stimme sprechen
  const wantDE = lang === 'de';
  u.lang = wantDE ? 'de-DE' : 'en-US'; u.rate = 0.85; u.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const prefix = wantDE ? 'de' : 'en';
  const v = voices.find(v => v.lang.startsWith(prefix) && v.localService) ||
            voices.find(v => v.lang.startsWith(prefix));
  if(v) u.voice = v;
  window.speechSynthesis.speak(u);
}
function speakText(btn){
  const t = btn.parentElement && btn.parentElement.querySelector('.ex-text');
  if(t && t.textContent) speakWord(t.textContent.trim());
}


function resetRound(){
  roundCorrect = 0;
  roundWrongWords = [];
  combo = 0;
  bestComboInRound = 0;
  roundStartTs = Date.now();
}

// Erzeugt einen frischen 10er-Pool aus zufälligen Wörtern
function buildRoundDeck(){
  const pool = poolWords();
  const size = Math.min(ROUND_SIZE, pool.length);
  return shuffle(pool).slice(0, size);
}


/* ═══════════════════════════════════════════════
   🧠 SPACED REPETITION (Leitner-Box, Lexilize-inspiriert)
   ═══════════════════════════════════════════════ */
const SRS = {
  KEY: 'etSRS_v1',
  // index = stufe; INTERVALS_DAYS[level] = Tage bis zur naechsten Wiederholung
  INTERVALS_DAYS: [0, 0, 1, 3, 7, 14, 30, 90],
  LABELS: ['Neu','Lernen','+1 Tag','+3 Tage','+7 Tage','+2 Wo','+30 Tage','Gemeistert'],
  state: {},

  load(){
    try { this.state = JSON.parse(localStorage.getItem(this.KEY) || '{}'); }
    catch(e){ this.state = {}; }
  },
  save(skipSync){
    try { localStorage.setItem(this.KEY, JSON.stringify(this.state)); } catch(e) {}
    if(!skipSync && typeof Sync !== 'undefined' && Sync.schedulePush){ Sync.schedulePush(); }
  },
  // Lokales Datum als YYYY-MM-DD (timezone-safe, unabhaengig von UTC-Offset)
  localISO(d){
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,'0');
    const dd = String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${dd}`;
  },
  todayISO(){ return this.localISO(new Date()); },
  addDays(iso, days){
    const [y,m,dd] = iso.split('-').map(Number);
    const d = new Date(y, m-1, dd);
    d.setDate(d.getDate() + days);
    return this.localISO(d);
  },
  entry(id){
    if(!this.state[id]){
      this.state[id] = { level:0, nextDue:this.todayISO(), lastReview:null, ok:0, wrong:0, updatedAt:0 };
    }
    return this.state[id];
  },
  isDue(id){
    const e = this.entry(id);
    return e.nextDue <= this.todayISO();
  },
  markCorrect(id){
    const e = this.entry(id);
    const wasMaster = (e.level||0) >= 7;
    const prevLevel = e.level || 0;
    e.level = Math.min(7, (e.level||0) + 1);
    e.lastReview = this.todayISO();
    e.nextDue = this.addDays(this.todayISO(), this.INTERVALS_DAYS[e.level] || 0);
    e.ok = (e.ok||0) + 1;
    e.updatedAt = Date.now();
    this.save();
    if(e.level > prevLevel) showLevelUp(prevLevel, e.level);
    if(!wasMaster && e.level >= 7 && typeof Stats !== 'undefined' && Stats.recordMastered){
      Stats.recordMastered();
    }
  },
  markWrong(id){
    const e = this.entry(id);
    e.level = 1;
    e.lastReview = this.todayISO();
    e.nextDue = this.todayISO(); // sofort wieder
    e.wrong = (e.wrong||0) + 1;
    e.updatedAt = Date.now();
    this.save();
  },
  resetAll(){
    // Tombstone-Zeitstempel, damit ein leerer Stand beim Sync als "neuer" gilt
    // als ein vollerer Remote-Stand vom anderen Gerät.
    this.state = { __reset: { updatedAt: Date.now() } };
    this.save();
    delete this.state.__reset; // lokal nicht benötigt
    this.save(true);
  },
  // Merge eines Remote-Stands in den lokalen State.
  // Regel: pro Wort-ID gewinnt der Eintrag mit dem höheren updatedAt.
  // Fehlt lokal, remote vorhanden -> übernehmen. Umgekehrt -> lokaler Stand bleibt.
  mergeRemote(remote){
    if(!remote || typeof remote !== 'object') return false;
    const remoteEntries = remote.entries || {};
    let changed = false;
    // Global-Reset-Tombstone: wenn Remote einen __reset hat, der neuer ist als ALLE lokalen Einträge, leeren
    const remoteReset = remoteEntries.__reset && remoteEntries.__reset.updatedAt ? remoteEntries.__reset.updatedAt : 0;
    if(remoteReset){
      const anyLocalNewer = Object.entries(this.state).some(([id,e]) => id !== '__reset' && (e.updatedAt||0) > remoteReset);
      if(!anyLocalNewer){
        // Remote hat reset, lokal keine neueren Änderungen -> alles leeren
        const hadEntries = Object.keys(this.state).some(k => k !== '__reset');
        this.state = {};
        if(hadEntries){ changed = true; this.save(true); }
        return changed;
      }
    }
    for(const [id, r] of Object.entries(remoteEntries)){
      if(id === '__reset') continue;
      const l = this.state[id];
      if(!l){ this.state[id] = r; changed = true; continue; }
      const lU = l.updatedAt || 0;
      const rU = r.updatedAt || 0;
      if(rU > lU){ this.state[id] = r; changed = true; }
    }
    if(changed) this.save(true);
    // Stats parallel mergen (eigenes updatedAt-Feld)
    if(remote.stats && typeof Stats !== 'undefined' && Stats.applyRemote){
      if(Stats.applyRemote(remote.stats)) changed = true;
    }
    return changed;
  },
  stats(words){
    const today = this.todayISO();
    let due=0, fresh=0, learning=0, mastered=0;
    words.forEach(w => {
      const e = this.state[w.id];
      if(!e){ fresh++; due++; return; }
      if(e.level >= 7) mastered++;
      else if(e.level >= 1) learning++;
      else fresh++;
      if(e.nextDue <= today) due++;
    });
    return { due, fresh, learning, mastered, total: words.length };
  },
  dueQueue(words){
    const today = this.todayISO();
    return words
      .filter(w => {
        const e = this.state[w.id];
        return !e || e.nextDue <= today;
      })
      .sort((a,b) => {
        const ea = this.state[a.id], eb = this.state[b.id];
        const la = ea ? ea.level : 0, lb = eb ? eb.level : 0;
        // Niedrige Stufen zuerst (faellige Lernwoerter), neue gemischt rein
        if(la !== lb) return la - lb;
        return Math.random() - 0.5;
      });
  }
};
SRS.load();


/* ═══════════════════════════════════════════════
   🏆 STATS (XP, Streak, Sessions, Tagesziel, Match-Highscore)
   ═══════════════════════════════════════════════ */
const Stats = {
  KEY: 'etStats_v1',
  defaults(){
    return {
      xp: 0,
      streak: 0,
      longestStreak: 0,
      lastDay: null,
      dailyGoal: 20,
      dailyProgress: {},   // { 'YYYY-MM-DD': count }
      sessions: [],        // letzte 50 Sessions
      perfectRounds: 0,
      bestCombo: 0,
      updatedAt: 0
    };
  },
  state: null,
  load(){
    this.state = this.defaults();
    try {
      const raw = JSON.parse(localStorage.getItem(this.KEY) || 'null');
      if(raw && typeof raw === 'object') Object.assign(this.state, raw);
    } catch(e){}
  },
  save(skipSync){
    this.state.updatedAt = Date.now();
    try { localStorage.setItem(this.KEY, JSON.stringify(this.state)); } catch(e){}
    if(!skipSync && typeof Sync !== 'undefined' && Sync.schedulePush){ Sync.schedulePush(); }
  },
  todayISO(){ return SRS.todayISO(); },
  yesterdayISO(){ return SRS.addDays(SRS.todayISO(), -1); },

  // Bei jeder Antwort aufgerufen. wasCorrect: bool, mode: string
  recordAnswer(wasCorrect, mode){
    const today = this.todayISO();
    // Streak-Bumping nur einmal pro Tag
    if(this.state.lastDay !== today){
      if(this.state.lastDay === this.yesterdayISO()){
        this.state.streak = (this.state.streak || 0) + 1;
      } else {
        this.state.streak = 1;
      }
      this.state.lastDay = today;
      if(this.state.streak > (this.state.longestStreak||0)){
        this.state.longestStreak = this.state.streak;
      }
    }
    this.state.dailyProgress[today] = (this.state.dailyProgress[today] || 0) + 1;
    if(wasCorrect) this.state.xp = (this.state.xp || 0) + 10;
    this.save();
  },

  awardBonus(n){ this.state.xp = (this.state.xp || 0) + n; this.save(); },
  recordPerfectRound(){ this.state.perfectRounds = (this.state.perfectRounds || 0) + 1; this.awardBonus(50); },
  recordMastered(){ this.awardBonus(25); },
  recordCombo(c){ if(c > (this.state.bestCombo||0)){ this.state.bestCombo = c; this.save(); } },

  recordSession(s){
    const session = Object.assign({ date: this.todayISO(), ts: Date.now() }, s);
    this.state.sessions.unshift(session);
    if(this.state.sessions.length > 50) this.state.sessions = this.state.sessions.slice(0, 50);
    this.save();
  },



  // 7-Tage-Accuracy-Trend (vs. die 7 Tage davor)
  accuracyTrend(){
    const todayMs = new Date(this.todayISO()).getTime();
    let cur = {tot:0,ok:0}, prev = {tot:0,ok:0};
    for(const s of this.state.sessions){
      if(typeof s.total !== 'number' || typeof s.correct !== 'number') continue;
      const sMs = new Date(s.date).getTime();
      const ageDays = Math.floor((todayMs - sMs) / 86400000);
      if(ageDays < 0) continue;
      if(ageDays < 7){ cur.tot += s.total; cur.ok += s.correct; }
      else if(ageDays < 14){ prev.tot += s.total; prev.ok += s.correct; }
    }
    const curPct  = cur.tot  ? Math.round(100 * cur.ok / cur.tot)  : null;
    const prevPct = prev.tot ? Math.round(100 * prev.ok / prev.tot) : null;
    const diff = (curPct !== null && prevPct !== null) ? (curPct - prevPct) : 0;
    return { curPct, prevPct, diff, samples: cur.tot };
  },

  todayProgress(){ return this.state.dailyProgress[this.todayISO()] || 0; },
  todayGoalPct(){ const g = this.state.dailyGoal || 20; return Math.min(1, this.todayProgress() / g); },
  setDailyGoal(n){ if(typeof n === 'number' && n > 0 && n <= 999){ this.state.dailyGoal = n; this.save(); } },

  // Wird beim Sync-Pull aufgerufen
  applyRemote(remote){
    if(!remote || typeof remote !== 'object') return false;
    const lU = this.state.updatedAt || 0;
    const rU = remote.updatedAt || 0;
    if(rU > lU){
      this.state = Object.assign(this.defaults(), remote);
      try { localStorage.setItem(this.KEY, JSON.stringify(this.state)); } catch(e){}
      return true;
    }
    return false;
  }
};
Stats.load();


/* ═══════════════════════════════════════════════
   ☁️ SYNC (GitHub-Gist-basierte Geräte-Synchronisation)
   Speicherort: Ein privater Gist im GitHub-Account des Users.
   Token: fine-grained PAT mit "Gist"-Scope, lokal in localStorage.
   Merge: pro Wort-ID gewinnt das höhere updatedAt. Konfliktfrei, solange
   nur ein Mensch das Training auf beiden Geräten durchführt.
   ═══════════════════════════════════════════════ */
const Sync = {
  TOKEN_KEY: 'etSyncToken_v1',
  GIST_KEY:  'etSyncGistId_v1',
  FILENAME:  'english-trainer-srs.json',
  status: 'off',    // off | ok | pushing | pulling | error
  lastError: null,
  lastSync: null,
  _debounce: null,
  _inflight: false,
  _pendingAfterInflight: false,

  token(){ try { return localStorage.getItem(this.TOKEN_KEY) || ''; } catch(e){ return ''; } },
  gistId(){ try { return localStorage.getItem(this.GIST_KEY) || ''; } catch(e){ return ''; } },
  isConfigured(){ return !!this.token(); },

  setToken(t){
    try {
      if(t) localStorage.setItem(this.TOKEN_KEY, t);
      else  localStorage.removeItem(this.TOKEN_KEY);
      // Ablaufdatum gehoert zum Token: bei Wechsel/Trennung zuruecksetzen
      localStorage.removeItem('etTokenExpiry');
    } catch(e){}
  },
  setGistId(g){
    try {
      if(g) localStorage.setItem(this.GIST_KEY, g);
      else  localStorage.removeItem(this.GIST_KEY);
    } catch(e){}
  },

  setStatus(s, err){
    this.status = s;
    this.lastError = err || null;
    if(s === 'ok') this.lastSync = new Date();
    this.renderBadge();
  },

  renderBadge(){
    const el = document.getElementById('syncBadge');
    if(!el) return;
    el.innerHTML = this.badgeHTML();
  },

  badgeHTML(){
    if(!this.isConfigured())    return `<span class="sync-badge sync-off" onclick="openSyncModal()" title="Sync ist noch nicht eingerichtet – klicken zum Einrichten">☁️ Sync einrichten</span>`;
    if(this.status === 'pushing') return `<span class="sync-badge sync-active">⟳ Synchronisiere…</span>`;
    if(this.status === 'pulling') return `<span class="sync-badge sync-active">↓ Lade Stände…</span>`;
    if(this.status === 'error')   return `<span class="sync-badge sync-err" onclick="openSyncModal()" title="${(this.lastError||'').replace(/"/g,'&quot;')}">⚠️ Sync-Fehler – klick für Details</span>`;
    const t = this.lastSync ? this.lastSync.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}) : '';
    return `<span class="sync-badge sync-ok" onclick="openSyncModal()" title="Klicken für Einstellungen">☁️ Synchronisiert${t?' · '+t:''}</span>`;
  },

  async api(method, path, body){
    const token = this.token();
    if(!token) throw new Error('Kein Token gesetzt.');
    const res = await fetch('https://api.github.com' + path, {
      method,
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer ' + token,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });
    // Token-Ablaufdatum merken (GitHub sendet es als Antwort-Header mit) —
    // der Heute-Screen warnt damit, BEVOR der Token nach 90 Tagen ablaeuft.
    try {
      const exp = res.headers.get('github-authentication-token-expiration');
      if(exp) localStorage.setItem('etTokenExpiry', exp);
    } catch(e){}
    if(!res.ok){
      const txt = await res.text().catch(()=> '');
      throw new Error(res.status + ' ' + res.statusText + (txt ? ' – ' + txt.slice(0,200) : ''));
    }
    return res.json();
  },

  buildPayload(){
    return {
      schema: 2,
      updatedAt: Date.now(),
      entries: SRS.state,
      stats: (typeof Stats !== 'undefined') ? Stats.state : null
    };
  },

  async createGist(){
    const gist = await this.api('POST', '/gists', {
      description: 'English Trainer – SRS Sync (Lernfortschritt)',
      public: false,
      files: { [this.FILENAME]: { content: JSON.stringify(this.buildPayload(), null, 2) } }
    });
    this.setGistId(gist.id);
    return gist.id;
  },

  async pull(){
    if(!this.isConfigured()) return false;
    if(!this.gistId()) return false;
    this.setStatus('pulling');
    try {
      const gist = await this.api('GET', '/gists/' + this.gistId());
      const file = gist.files && gist.files[this.FILENAME];
      if(!file) throw new Error('Datei "' + this.FILENAME + '" im Gist nicht gefunden.');
      let raw = file.content || '';
      if(file.truncated && file.raw_url){
        const r = await fetch(file.raw_url);
        raw = await r.text();
      }
      const data = JSON.parse(raw || '{}');
      const changed = SRS.mergeRemote(data);
      this.setStatus('ok');
      if(changed && typeof render === 'function' && typeof WORDS !== 'undefined'){
        if(typeof mode !== 'undefined' && mode === 'train'){
          trainDeck = buildTrainDeck();
        }
        try { render(); } catch(e){}
      }
      return changed;
    } catch(e){
      this.setStatus('error', e.message || String(e));
      return false;
    }
  },

  async push(){
    if(!this.isConfigured()) return false;
    if(this._inflight){ this._pendingAfterInflight = true; return false; }
    this._inflight = true;
    try {
      if(!this.gistId()){
        this.setStatus('pushing');
        await this.createGist();
        this.setStatus('ok');
        return true;
      }
      this.setStatus('pushing');
      await this.api('PATCH', '/gists/' + this.gistId(), {
        files: { [this.FILENAME]: { content: JSON.stringify(this.buildPayload(), null, 2) } }
      });
      this.setStatus('ok');
      return true;
    } catch(e){
      this.setStatus('error', e.message || String(e));
      return false;
    } finally {
      this._inflight = false;
      if(this._pendingAfterInflight){
        this._pendingAfterInflight = false;
        this.schedulePush();
      }
    }
  },

  schedulePush(){
    if(!this.isConfigured()) return;
    clearTimeout(this._debounce);
    this._debounce = setTimeout(() => this.push(), 1500);
  },

  async init(){
    if(!this.isConfigured()){ this.setStatus('off'); return; }
    // 1. Remote einlesen und ggf. mergen
    if(this.gistId()){
      await this.pull();
    }
    // 2. lokalen (ggf. gemergten) Stand hochschieben – falls lokal Einträge neuer sind als remote
    await this.push();
  }
};

// Automatischer Re-Sync, wenn das Fenster wieder in den Vordergrund kommt oder Netz zurückkehrt.
window.addEventListener('visibilitychange', () => {
  if(document.visibilityState === 'visible' && Sync.isConfigured() && Sync.gistId()){
    Sync.pull();
  }
});
window.addEventListener('online', () => {
  if(Sync.isConfigured()){
    Sync.pull().then(() => Sync.push());
  }
});

/* ═══════════════════════════════════════════════
   Sync-Setup-Modal (einmalige Einrichtung pro Gerät)
   ═══════════════════════════════════════════════ */
function openSyncModal(){
  const m = document.getElementById('syncModal');
  if(!m) return;
  const tok = Sync.token();
  const gid = Sync.gistId();
  document.getElementById('syncTokenInput').value = tok;
  document.getElementById('syncGistInput').value  = gid;
  const hint = document.getElementById('syncModalHint');
  if(Sync.status === 'error' && Sync.lastError){
    // v4.1: 401 verständlich erklären — häufigster Fall: Token abgelaufen (GitHub-Tokens
    // laufen standardmässig nach 90 Tagen ab) oder beim Eintragen verändert.
    const ist401 = /(^|\s)401(\s|$)|Bad credentials/i.test(Sync.lastError);
    hint.innerHTML = ist401
      ? '<strong style="color:var(--err)">Token ungültig oder abgelaufen.</strong> Trage denselben gültigen Token ein wie auf deinem anderen Gerät — oder erstelle auf github.com → Settings → Developer settings → Personal access tokens einen neuen (Berechtigungen: Gists lesen/schreiben + Issues lesen/schreiben für das Repo Englishtrainer) und hinterlege ihn auf <b>allen</b> Geräten. Die richtige Gist-ID kannst du am funktionierenden Gerät hier im Fenster kopieren.'
      : '<strong style="color:var(--err)">Letzter Fehler:</strong> ' + Sync.lastError.replace(/</g,'&lt;');
  } else if(gid){
    hint.innerHTML = 'Gist-ID ist gesetzt. Auf dem zweiten Gerät denselben Token und dieselbe Gist-ID eintragen.';
  } else {
    hint.innerHTML = 'Trage deinen GitHub Personal Access Token ein. Lass das Gist-ID-Feld leer, wenn du Sync jetzt zum ersten Mal einrichtest – die App legt dann automatisch einen privaten Gist an.';
  }
  m.classList.add('open');
}
function closeSyncModal(){
  const m = document.getElementById('syncModal');
  if(m) m.classList.remove('open');
}
async function saveSyncSettings(){
  const tok = document.getElementById('syncTokenInput').value.trim();
  const gid = document.getElementById('syncGistInput').value.trim();
  const msg = document.getElementById('syncModalMsg');
  msg.textContent = '';
  if(!tok){
    Sync.setToken(''); Sync.setGistId('');
    Sync.setStatus('off');
    msg.innerHTML = '<span style="color:var(--muted)">Sync getrennt.</span>';
    return;
  }
  Sync.setToken(tok);
  Sync.setGistId(gid);
  msg.innerHTML = '<span style="color:var(--muted)">Verbinde…</span>';
  try {
    if(gid){
      // Zweites Gerät: erst lesen, dann mergen, dann schreiben
      await Sync.pull();
      await Sync.push();
    } else {
      // Erstes Gerät: Gist anlegen
      await Sync.push();
    }
    if(Sync.status === 'ok'){
      document.getElementById('syncGistInput').value = Sync.gistId();
      msg.innerHTML = '<span style="color:var(--ok)">✓ Verbunden. Gist-ID: <code style="user-select:all">' + Sync.gistId() + '</code></span>';
    } else if(Sync.status === 'error'){
      msg.innerHTML = '<span style="color:var(--err)">Fehler: ' + (Sync.lastError||'unbekannt') + '</span>';
    }
  } catch(e){
    msg.innerHTML = '<span style="color:var(--err)">Fehler: ' + (e.message||e) + '</span>';
  }
  Sync.renderBadge();
}
function copyGistIdToClipboard(){
  const g = Sync.gistId();
  if(!g) return;
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(g).then(() => {
      const msg = document.getElementById('syncModalMsg');
      if(msg) msg.innerHTML = '<span style="color:var(--ok)">Gist-ID in die Zwischenablage kopiert.</span>';
    });
  }
}
async function manualSyncNow(){
  if(!Sync.isConfigured()){ openSyncModal(); return; }
  await Sync.pull();
  await Sync.push();
}


let trainDeck = [];
let trainIdx = 0;
let trainFlipped = false;

/* ═══════════════════════════════════════════════
   Mode switching
   ═══════════════════════════════════════════════ */
/* ── Mobile Sticky Bar Helpers ── */
let _mobileNextFn = null;
function showMobileNext(label, fn){
  _mobileNextFn = fn;
  const bar = document.getElementById('mobileNextBar');
  const btn = document.getElementById('mobileNextBtn');
  if(bar && btn && window.innerWidth <= 540){
    btn.textContent = label;
    bar.style.display = 'block';
  }
}
function hideMobileNext(){
  const bar = document.getElementById('mobileNextBar');
  if(bar) bar.style.display = 'none';
  _mobileNextFn = null;
}
function mobileNextAction(){
  if(_mobileNextFn){ const fn = _mobileNextFn; hideMobileNext(); fn(); }
}
function scrollToTop(){ window.scrollTo({top:0, behavior:'smooth'}); }


/* ═══════════════════════════════════════════════
   6. NAVIGATION — ein setMode, ein render.
   Modi: today | train | flash | quiz | fill | list | type | hardlist
   ═══════════════════════════════════════════════ */
function setActiveTab(m){
  document.querySelectorAll('.nav-tabs .tab').forEach(t => t.classList.toggle('active', !!m && t.dataset.mode === m));
}

function setMode(m){
  if(m === 'type'){ startTypeMode(); return; }
  if(m === 'hardlist'){ renderHardList(); updateTopbar(); updateFab(); return; }
  mode = m;
  idx = 0; flipped = false; quizAnswered = false; fillChecked = false;
  trainIdx = 0; trainFlipped = false;
  hideMobileNext();
  setActiveTab(m);
  if(m === 'train'){
    trainDeck = buildTrainDeck();
  } else if(m === 'quiz' || m === 'fill'){
    deck = buildRoundDeck();
    resetRound();
  } else if(m === 'flash'){
    flashShowPicker = true;
    deck = shuffle(poolWords());
  } else if(m !== 'today'){
    deck = shuffle(poolWords());
  }
  scrollToTop();
  render();
}

function render(){
  hideMobileNext();
  if(mode === 'today') renderToday();
  else if(mode === 'train') renderTrain();
  else if(mode === 'flash') renderFlash();
  else if(mode === 'quiz') renderQuiz();
  else if(mode === 'fill') renderFill();
  else if(mode === 'type') renderTypeMode();
  else if(mode === 'hardlist') renderHardList();
  else renderList();
  updateTopbar();
  updateFab();
}

/* ── Kopfzeile (oben fix) ── */
const MODE_TITLES = {
  list:['WORTSCHATZ','Wortliste'], hardlist:['HOHE FEHLERQUOTE','Schwierige Wörter']
};
function setTopbar(t1, t2){
  const a = document.getElementById('v3T1'), b = document.getElementById('v3T2');
  if(a) a.textContent = t1 || '';
  if(b) b.textContent = t2 || '';
}
function greet(){ const h = new Date().getHours(); return h<5?'Gute Nacht':h<11?'Guten Morgen':h<17?'Hallo':'Guten Abend'; }
function dateDE(){ const d=new Date(), t=['SO','MO','DI','MI','DO','FR','SA'], m=['JAN','FEB','MÄR','APR','MAI','JUN','JUL','AUG','SEP','OKT','NOV','DEZ']; return t[d.getDay()]+', '+d.getDate()+'. '+m[d.getMonth()]; }
function updateTopbar(){
  const n = document.getElementById('v3StreakN');
  if(n) n.textContent = (Stats.state && Stats.state.streak) || 0;
  if(mode === 'today'){ setTopbar(dateDE(), greet()); return; }
  // train/flash/quiz/fill/type setzen ihren Titel selbst im Renderer
  const t = MODE_TITLES[mode];
  if(t) setTopbar(t[0], t[1]);
}
function updateFab(){
  const f = document.getElementById('fabAdd');
  if(f) f.style.display = (mode==='today' || mode==='list' || mode==='hardlist') ? 'flex' : 'none';
}
function initTopbar(){
  const s = document.getElementById('v3Streak');
  if(s) s.innerHTML = svg('flame',12) + ' <span id="v3StreakN">0</span>';
  const g = document.getElementById('v3Set');
  if(g) g.innerHTML = svg('settings',15);
}
function initNav(){
  document.querySelectorAll('.nav-tabs .tab').forEach(t => {
    const icon = t.querySelector('.tab-icon');
    if(icon) icon.innerHTML = svg(t.dataset.mode || 'train', 22);
  });
}

/* ── updateStats: Zähler in der Kopfzeile aktuell halten ── */
function updateStats(){
  const n = document.getElementById('v3StreakN');
  if(n) n.textContent = (Stats.state && Stats.state.streak) || 0;
}


/* ═══════════════════════════════════════════════
   7a. HEUTE-Screen — Übersicht auf einer Bildschirmseite
   ═══════════════════════════════════════════════ */
function counts(){
  const c = { due:0, fresh:0, learning:0, mast:0 };
  const today = SRS.todayISO();
  WORDS.forEach(w => {
    const e = SRS.state[w.id];
    // Wichtig: SRS.entry() hier NICHT verwenden — das legt beim blossen
    // Lesen leere Einträge an. Einträge ohne einzige Antwort zählen als „neu".
    if(!e || ((e.level||0) === 0 && ((e.ok||0) + (e.wrong||0)) === 0)){ c.fresh++; return; }
    if((e.level||0) >= 7){ c.mast++; return; }
    if(e.nextDue <= today) c.due++; else c.learning++;
  });
  return c;
}
function hardCount(){
  let n = 0;
  WORDS.forEach(w => {
    const e = SRS.state[w.id]; if(!e) return;
    const t = (e.ok||0) + (e.wrong||0);
    if(t >= 2 && (e.wrong||0)/t > 0.4) n++;
  });
  return n;
}
function weekDots(){
  let out = '';
  try {
    const byDate = (Stats.state && Stats.state.dailyProgress) || {};
    const today = new Date();
    for(let i = 6; i >= 0; i--){
      const dd = new Date(today); dd.setDate(today.getDate() - i);
      const iso = dd.toISOString().slice(0, 10);
      out += '<i class="' + ((byDate[iso]||0) > 0 ? 'done' : '') + (i === 0 ? ' today' : '') + '"></i>';
    }
  } catch(e){ for(let j = 0; j < 7; j++) out += '<i></i>'; }
  return '<div class="v3t-week">' + out + '</div>';
}
function ringHTML(done, goal){
  const size = 64, st = 7, r = (size - st) / 2, c = 2 * Math.PI * r, pct = goal > 0 ? Math.min(1, done / goal) : 0;
  return '<div class="v3t-ring"><svg width="' + size + '" height="' + size + '">'
    + '<circle cx="' + size/2 + '" cy="' + size/2 + '" r="' + r + '" fill="none" stroke="var(--card-hover)" stroke-width="' + st + '"/>'
    + '<circle cx="' + size/2 + '" cy="' + size/2 + '" r="' + r + '" fill="none" stroke="url(#rg)" stroke-width="' + st + '" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + (c * (1 - pct)) + '"/>'
    + '<defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7C8CFF"/><stop offset="100%" stop-color="#5EE3D6"/></linearGradient></defs>'
    + '</svg><div class="rt"><b>' + done + '</b><small>von ' + goal + '</small></div></div>';
}

/* Token-Ablauf: Tage bis zum Ablauf des GitHub-Tokens (null = unbekannt).
   Das Datum stammt aus dem Antwort-Header der GitHub-API (Sync.api). */
function tokenDaysLeft(){
  try {
    if(!Sync.isConfigured()) return null;
    const raw = localStorage.getItem('etTokenExpiry');
    if(!raw) return null;
    // GitHub-Format: "2026-11-28 07:29:12 UTC" → ISO
    const d = new Date(raw.replace(' UTC', 'Z').replace(' ', 'T'));
    if(isNaN(d)) return null;
    return Math.floor((d.getTime() - Date.now()) / 86400000);
  } catch(e){ return null; }
}
function tokenWarnHTML(){
  const days = tokenDaysLeft();
  if(days === null || days > 14) return '';
  const expired = days < 0;
  const txt = expired
    ? 'Dein GitHub-Token ist abgelaufen — Sync und Wort-Hinzufügen funktionieren nicht mehr.'
    : 'Dein GitHub-Token läuft in ' + days + ' Tag' + (days === 1 ? '' : 'en') + ' ab. Jetzt erneuern, bevor der Sync stoppt.';
  return '<div class="v3t-warn' + (expired ? ' expired' : '') + '" onclick="openSyncModal()">'
    + '<span class="ico">' + (expired ? '⛔' : '⚠️') + '</span>'
    + '<span class="txt">' + txt + '</span>'
    + '<span class="act">Token erneuern →</span></div>';
}

function renderToday(){
  const app = document.getElementById('app'); if(!app) return;
  const c = counts();
  let goal = 20, prog = 0, xp = 0, streak = 0;
  try { goal = Stats.state.dailyGoal || 20; prog = Stats.todayProgress(); xp = Stats.state.xp || 0; streak = Stats.state.streak || 0; } catch(e){}
  const total = WORDS.length;
  const hc = hardCount();
  // Dosierte neue Wörter: „X wiederholen · Y neue heute · Z im Vorrat"
  const v4 = todayNums(c);
  const open = c.due + v4.newToday;
  const ctaMode = open > 0 ? 'train' : 'flash';
  const ctaMain = c.due > 0 ? 'Training fortsetzen' : (v4.newToday > 0 ? 'Neue Wörter lernen' : 'Frei üben');
  const ctaSub  = open > 0 ? (c.due + ' fällig · ' + v4.newToday + ' neue heute') : 'Alles erledigt — Karteikarten';
  app.innerHTML = '<div class="v3t">'
    + tokenWarnHTML()
    + '<div class="v3t-hero">'
    +   '<div class="v3t-hero-row">' + ringHTML(prog, goal)
    +   '<div style="flex:1;min-width:0">'
    +     '<div class="v3t-pill">' + (open > 0 ? 'Bereit zum Lernen' : 'Tagesziel im Blick') + '</div>'
    +     '<div class="v3t-headline">' + total + ' Wörter im Wortschatz</div>'
    +     '<div class="v3t-counts"><b class="c-due">' + c.due + '</b> wiederholen &nbsp;·&nbsp; <b class="c-new">' + v4.newToday + '</b> neu' + (v4.vorrat > 0 ? ' <span style="opacity:.75">(+' + v4.vorrat + ' Vorrat)</span>' : '') + ' &nbsp;·&nbsp; <b class="c-mast">' + c.mast + '</b> gemeistert</div>'
    +   '</div></div>'
    +   '<button class="v3t-cta" onclick="setMode(\'' + ctaMode + '\')"><span class="l"><small>' + ctaSub + '</small><b>' + ctaMain + '</b></span><span class="arr">' + svg('play',13,2) + '</span></button>'
    + '</div>'
    + '<div class="v3t-chips">'
    +   '<div class="v3t-chip" onclick="openProgressSheet()"><div class="v">🔥 ' + streak + '</div><div class="l">Streak</div>' + weekDots() + '</div>'
    +   '<div class="v3t-chip" onclick="setMode(\'list\')"><div class="v">' + total + '</div><div class="l">Wortschatz</div></div>'
    +   '<div class="v3t-chip"><div class="v">⭐ ' + xp + '</div><div class="l">XP</div></div>'
    + '</div>'
    + '<div class="v3t-label">Freies Üben</div>'
    + '<div class="v3t-tiles">'
    +   '<div class="v3t-tile" onclick="setMode(\'type\')"><span class="ico">' + svg('fill',16) + '</span><div class="n">Tippmodus</div><div class="s">Aktiv erinnern · selbst tippen</div></div>'
    +   '<div class="v3t-tile" onclick="setMode(\'hardlist\')"><span class="ico" style="color:var(--err)">' + svg('trending',16) + '</span><div class="n">Schwierige Wörter</div><div class="s">Hohe Fehlerquote</div>' + (hc > 0 ? '<span class="cnt">' + hc + '</span>' : '') + '</div>'
    + '</div>'
    + '</div>';
}


/* ═══════════════════════════════════════════════
   7b. TRAINING — Spaced Repetition in 12er-Runden:
   erst fällige Wiederholungen, dann dosiert neue Wörter.
   Falsche Karten kommen in derselben Runde erneut.
   ═══════════════════════════════════════════════ */
const TRAIN_ROUND = 12;    // Karten pro Trainings-Runde
const TRAIN_REQUEUE = 4;   // falsche Karte kommt nach 4 Karten wieder
let trainRound = { ok: 0, wrong: 0 };

/* Einstellungen (localStorage) */
function getNewPerDay(){
  try { const n = parseInt(localStorage.getItem('etNewPerDay'), 10); if([5,10,15,20].indexOf(n) >= 0) return n; } catch(e){}
  return 10;
}
function setNewPerDay(n){
  try { localStorage.setItem('etNewPerDay', String(n)); } catch(e){}
  openSettings();
  if(mode === 'today') try { render(); } catch(e){}
}
function getAutoSpeak(){ try { return localStorage.getItem('etAutoSpeak') === '1'; } catch(e){ return false; } }
function setAutoSpeak(on){
  try { localStorage.setItem('etAutoSpeak', on ? '1' : '0'); } catch(e){}
  openSettings();
}

/* Zähler „heute eingeführte neue Wörter" (synct über Stats.state) */
function introToday(){
  try {
    const ni = Stats.state.newIntro;
    if(ni && ni.date === SRS.todayISO()) return ni.count || 0;
  } catch(e){}
  return 0;
}
function bumpIntro(){
  try {
    const today = SRS.todayISO();
    if(!Stats.state.newIntro || Stats.state.newIntro.date !== today) Stats.state.newIntro = { date: today, count: 0 };
    Stats.state.newIntro.count++;
    Stats.save();
  } catch(e){}
}
function isFresh(w){
  const e = SRS.state[w.id];
  return !e || (((e.level||0) === 0) && (((e.ok||0) + (e.wrong||0)) === 0));
}

/* Runden-Deck: erst Wiederholungen, dann dosiert Neues */
function buildTrainDeck(){
  const today = SRS.todayISO();
  const reviews = [], fresh = [];
  try {
    WORDS.forEach(w => {
      if(isFresh(w)){ fresh.push(w); return; }
      const e = SRS.state[w.id];
      if((e.level||0) < 7 && e.nextDue <= today) reviews.push(w);
    });
  } catch(e){ return SRS.dueQueue(WORDS); }
  reviews.sort((a, b) => {
    const la = (SRS.state[a.id].level||0), lb = (SRS.state[b.id].level||0);
    if(la !== lb) return la - lb;
    return Math.random() - 0.5;
  });
  fresh.sort(() => Math.random() - 0.5);
  const allow = Math.max(0, getNewPerDay() - introToday());
  let d = reviews.slice(0, TRAIN_ROUND);
  if(d.length < TRAIN_ROUND) d = d.concat(fresh.slice(0, Math.min(TRAIN_ROUND - d.length, allow)));
  trainRound = { ok: 0, wrong: 0 };   // neue Runde, frisches Zwischenfazit
  return d;
}

/* Heute-Screen-Zahlen (Dosierung) */
function todayNums(c){
  const allow = Math.max(0, getNewPerDay() - introToday());
  const newToday = Math.min(allow, c.fresh);
  return { newToday: newToday, vorrat: c.fresh - newToday };
}

function renderTrain(){
  const app = document.getElementById('app'); if(!app) return;
  if(!trainDeck.length){ trainDeck = buildTrainDeck(); }

  if(!trainDeck.length || trainIdx >= trainDeck.length){
    setTopbar('SPACED REPETITION', 'Training');
    // Runden-Abschluss (Zwischenfazit + Nächste Runde), wenn eine Runde lief
    if(renderTrainRoundEnd(app)) return;
    app.innerHTML = '<div class="srs-empty">'
      + '<div class="srs-empty-emoji">🎉</div>'
      + '<h2>' + (trainIdx > 0 ? 'Sitzung abgeschlossen!' : 'Heute alles erledigt!') + '</h2>'
      + '<p>' + (trainIdx > 0
          ? 'Du hast ' + trainIdx + ' Wörter durchgegangen. Komm morgen wieder – die nächste Wiederholung wartet.'
          : 'Es gibt aktuell keine fälligen Wörter. Schau später wieder vorbei oder übe frei in den anderen Modi.') + '</p>'
      + '<div class="srs-actions">'
      + '<button class="btn btn-primary" onclick="setMode(\'flash\')">🃏 Freie Übung: Karteikarten</button>'
      + '<button class="btn btn-outline" onclick="setMode(\'today\')">🕐 Zur Übersicht</button>'
      + '</div>'
      + '<div class="srs-settings-row"><button class="srs-reset-btn" onclick="openTrainInfo()">Details &amp; Optionen</button></div>'
      + '</div>';
    return;
  }

  const w = trainDeck[trainIdx];
  const e = SRS.entry(w.id);
  const lvl = e.level || 0;
  const src = getImg(w);
  const imgFront = src
    ? '<img class="fc-image" src="' + src + '" alt="' + esc(w.word) + '" referrerpolicy="no-referrer" loading="lazy" onerror="console.warn(\'Bild fehlgeschlagen:\',this.src);this.style.display=\'none\'">'
    : phFor(w, 'lg');
  const examplesHTML = w.examples.map(ex =>
    '<div class="back-ex"><button class="speak-btn speak-sm" onclick="event.stopPropagation();speakText(this)" title="Satz vorlesen">🔊</button><strong>📝 Beispiel</strong><span class="ex-text">' + ex + '</span></div>'
  ).join('');
  const enDE = learnDir === 'en-de';
  const faceFront = enDE
    ? imgFront + '<div class="fc-word">' + w.word + '</div><div class="speak-row"><button class="speak-btn" onclick="speakWord(\'' + w.word.replace(/'/g, "\\'") + '\')">🔊</button><span class="fc-pronunciation">' + w.pronunciation + '</span></div><div class="fc-badges"><span class="badge badge-type">' + w.wordType + '</span><span class="badge ' + diffColor(w.difficulty) + '">' + w.difficulty + '</span><span class="level-badge lvl-' + lvl + '">Stufe ' + lvl + '</span></div><div class="fc-front-example"><button class="speak-btn speak-sm" onclick="event.stopPropagation();speakText(this)" title="Satz vorlesen">🔊</button>📝 „<span class="ex-text">' + w.examples[0] + '</span>"</div><div class="fc-hint">Tippe, um umzudrehen ↕</div>'
    : imgFront + '<div class="fc-word" style="font-size:20px;text-align:center;padding:0 12px">' + w.translation + '</div><div class="fc-badges" style="margin-top:10px"><span class="badge badge-type">' + w.wordType + '</span><span class="badge ' + diffColor(w.difficulty) + '">' + w.difficulty + '</span><span class="level-badge lvl-' + lvl + '">Stufe ' + lvl + '</span></div><div class="fc-front-example">📝 „' + (w.exampleDE || w.examples[0]) + '"</div><div class="fc-hint">Tippe, um umzudrehen ↕</div>';
  const faceBack = enDE
    ? '<div class="back-section-label">📖 Definition</div><div class="back-def">' + w.definition + '</div><div class="back-section-label">📝 Beispiele</div>' + examplesHTML + '<div class="back-translation-small">🇩🇪 ' + w.translation + '</div>'
    : '<div class="fc-word" style="font-size:28px;margin-bottom:6px">' + w.word + '</div><div class="speak-row" style="margin-bottom:12px"><button class="speak-btn" onclick="speakWord(\'' + w.word.replace(/'/g, "\\'") + '\')">🔊</button><span class="fc-pronunciation">' + w.pronunciation + '</span></div><div class="back-section-label">📖 Definition</div><div class="back-def">' + w.definition + '</div><div class="back-section-label">📝 Beispiele</div>' + examplesHTML;

  const pct = Math.round(((trainIdx + 1) / trainDeck.length) * 100);
  app.innerHTML =
    '<div class="v3tr-head">'
    + '<span class="v3tr-lvl">Stufe ' + lvl + '/7</span>'
    + '<div class="v3tr-prog" title="Karte ' + (trainIdx+1) + ' von ' + trainDeck.length + '"><i style="width:' + pct + '%"></i></div>'
    + '<button class="v3tr-btn" onclick="toggleDir()" aria-label="Lernrichtung wechseln">' + (enDE ? 'EN→DE' : 'DE→EN') + ' ⇄</button>'
    + '<button class="v3tr-btn icon" onclick="openTrainInfo()" aria-label="Session-Details">' + svg('info',15) + '</button>'
    + '</div>'
    + '<div class="v3-scene"><div class="scene">'
    + '<div class="flashcard ' + (trainFlipped ? 'flipped' : '') + '" id="trainFc" onclick="flipTrain()">'
    + '<div class="face">' + faceFront + '</div>'
    + '<div class="face face-back">' + faceBack + '</div>'
    + '</div></div></div>'
    + '<div class="srs-rate-row" id="trainRate" style="display:' + (trainFlipped ? 'flex' : 'none') + '">'
    + '<button class="btn btn-srs-err" onclick="rateTrain(false)">✗ Nicht gewusst</button>'
    + '<button class="btn btn-srs-ok" onclick="rateTrain(true)">✓ Gewusst</button>'
    + '</div>';
  setTopbar('KARTE ' + (trainIdx+1) + ' / ' + trainDeck.length, 'Training');
}

function flipTrain(){
  trainFlipped = !trainFlipped;
  const fc = document.getElementById('trainFc');
  if(fc) fc.classList.toggle('flipped', trainFlipped);
  const rate = document.getElementById('trainRate');
  if(rate) rate.style.display = trainFlipped ? 'flex' : 'none';
  // Auto-Aussprache beim Aufdecken (Option in den Einstellungen)
  try { if(trainFlipped && getAutoSpeak() && trainDeck[trainIdx]) speakWord(trainDeck[trainIdx].word, 'en'); } catch(e){}
}

function rateTrain(wasCorrect){
  if(!trainFlipped) return; // muss erst aufgedeckt werden
  const w = trainDeck[trainIdx];
  if(!w) return;
  if(isFresh(w)) bumpIntro();   // erstes Antippen eines neuen Worts = heute eingeführt
  if(wasCorrect){ SRS.markCorrect(w.id); correct++; trainRound.ok++; }
  else {
    SRS.markWrong(w.id); incorrect++; trainRound.wrong++;
    // Wiedervorlage: dieselbe Karte kommt in dieser Runde nach ein paar Karten erneut
    const pos = Math.min(trainIdx + 1 + TRAIN_REQUEUE, trainDeck.length);
    trainDeck.splice(pos, 0, w);
  }
  Stats.recordAnswer(wasCorrect, 'train');
  updateStats();
  trainIdx++;
  trainFlipped = false;
  scrollToTop();
  render();
}

function nextTrainRound(){
  trainDeck = buildTrainDeck();
  trainIdx = 0; trainFlipped = false;
  scrollToTop();
  render();
}

function renderTrainRoundEnd(app){
  const beantwortet = trainRound.ok + trainRound.wrong;
  if(!beantwortet) return false;   // keine Runde gelaufen → normaler Leer-Zustand
  const perfect = trainRound.wrong === 0;
  if(perfect && trainRound.ok >= 5) try { Stats.recordPerfectRound(); } catch(e){}
  // Was wartet noch?
  const today = SRS.todayISO();
  let reviewsLeft = 0, freshLeft = 0;
  try { WORDS.forEach(w => { if(isFresh(w)){ freshLeft++; return; } const e = SRS.state[w.id]; if((e.level||0) < 7 && e.nextDue <= today) reviewsLeft++; }); } catch(e){}
  const allow = Math.max(0, getNewPerDay() - introToday());
  const next = reviewsLeft + Math.min(allow, freshLeft);
  const quote = Math.round(100 * trainRound.ok / beantwortet);
  app.innerHTML = '<div class="v4-round">'
    + '<div class="lbl">Runde geschafft</div>'
    + '<div class="big"><b>' + trainRound.ok + '</b><span> / ' + beantwortet + ' richtig</span></div>'
    + '<div class="sub">' + quote + '&nbsp;% Trefferquote · Streak 🔥 ' + ((Stats.state && Stats.state.streak) || 0) + '</div>'
    + (perfect ? '<div class="perfect">🎉 Perfekte Runde — Bonus-XP!</div>' : '')
    + (next > 0
        ? '<div class="rest">Noch übrig heute: <b>' + reviewsLeft + '</b> Wiederholungen · <b>' + Math.min(allow, freshLeft) + '</b> neue Wörter</div>'
          + '<button class="v4-btn" onclick="nextTrainRound()">Nächste Runde →</button>'
        : '<div class="rest">🎉 Alles erledigt für heute — komm morgen wieder!</div>')
    + '<button class="v4-btn ghost" onclick="setMode(\'today\')">Zur Übersicht</button>'
    + '</div>';
  setTopbar('RUNDE BEENDET', 'Training');
  return true;
}

/* ⓘ-Sheet: Session & Tagesziel */
function openTrainInfo(){
  let sh = document.getElementById('v3-info-sheet');
  if(!sh){
    sh = document.createElement('div'); sh.id = 'v3-info-sheet';
    sh.onclick = ev => { if(ev.target === sh) sh.classList.remove('open'); };
    document.body.appendChild(sh);
  }
  let inner = '';
  try { inner = goalAndAccuracyHTML() + historyHTML(); } catch(e){ inner = '<p style="color:var(--muted);font-size:13px">Noch keine Daten.</p>'; }
  sh.innerHTML = '<div class="v3-sheet-inner"><span class="v3-sheet-handle"></span><h3>📊 Session &amp; Tagesziel</h3>' + inner
    + '<button class="v3-sheet-reset" onclick="resetSRS()">Lernfortschritt zurücksetzen</button>'
    + '<button class="v3-sheet-close" onclick="document.getElementById(\'v3-info-sheet\').classList.remove(\'open\')">Schliessen</button></div>';
  sh.classList.add('open');
}

/* Lernrichtung umschalten (alle Modi) */
function toggleDir(){
  typeChecked = false;  // Tippmodus: aktuelle Frage wird in der neuen Richtung frisch gestellt
  setLearnDir(learnDir === 'en-de' ? 'de-en' : 'en-de');
}


function resetSRS(){
  if(!confirm('Wirklich allen Lernfortschritt zurücksetzen? Diese Aktion lässt sich nicht rückgängig machen.')) return;
  SRS.resetAll();
  trainIdx = 0;
  trainFlipped = false;
  trainDeck = buildTrainDeck();
  render();
}


function goalAndAccuracyHTML(){
  const goal = Stats.state.dailyGoal || 20;
  const prog = Stats.todayProgress();
  const pct  = Stats.todayGoalPct();
  // Kreis-Geometrie: r=32, Umfang ≈ 201
  const r = 32, c = 2 * Math.PI * r;
  const offset = c * (1 - pct);
  const trend = Stats.accuracyTrend();
  const accStr = trend.curPct === null ? 'noch keine Daten' : `${trend.curPct}%`;
  let trendStr = '';
  if(trend.curPct !== null && trend.prevPct !== null){
    if(trend.diff > 0)      trendStr = `<span class="trend-up">↗ +${trend.diff}%</span>`;
    else if(trend.diff < 0) trendStr = `<span class="trend-down">↘ ${trend.diff}%</span>`;
    else                    trendStr = `<span class="trend-flat">→ stabil</span>`;
  } else {
    trendStr = `<span class="trend-flat">noch keine Vergleichsbasis</span>`;
  }
  const streak = Stats.state.streak || 0;
  const longest = Stats.state.longestStreak || 0;
  return `
    <div class="goal-row">
      <div class="goal-ring-wrap">
        <svg width="78" height="78" viewBox="0 0 78 78">
          <circle class="goal-ring-bg" cx="39" cy="39" r="${r}"></circle>
          <circle class="goal-ring-fill" cx="39" cy="39" r="${r}"
            stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"></circle>
        </svg>
        <div class="goal-ring-text">
          <div class="goal-ring-num">${prog}</div>
          <div class="goal-ring-of">/ ${goal}</div>
        </div>
      </div>
      <div class="goal-meta">
        <div class="goal-meta-line"><span>Tagesziel</span><strong>${prog} / ${goal} <button class="goal-edit" onclick="editDailyGoal()">ändern</button></strong></div>
        <div class="goal-meta-line"><span>Accuracy (7 Tage)</span><strong>${accStr} ${trendStr}</strong></div>
        <div class="goal-meta-line"><span>Streak 🔥</span><strong>${streak} Tag${streak===1?'':'e'} <span style="color:var(--muted);font-weight:500">(Rekord ${longest})</span></strong></div>
      </div>
    </div>`;
}

function historyHTML(){
  const sessions = (Stats.state.sessions || []).slice(0, 5);
  const modeIcon = { quiz:'❓ Quiz', fill:'✏️ Lückentext', train:'🧠 Training', flash:'🃏 Karten' };
  if(!sessions.length){
    return `<div class="history-box">
      <div class="history-head">📊 Letzte Sessions</div>
      <div class="history-empty">Noch keine abgeschlossenen Runden. Leg los — Quiz oder Lückentext starten!</div>
    </div>`;
  }
  const fmtDate = (iso) => {
    const today = SRS.todayISO(), y = SRS.addDays(today,-1);
    if(iso === today) return 'heute';
    if(iso === y)     return 'gestern';
    const [yy,mm,dd] = iso.split('-');
    return `${dd}.${mm}.`;
  };
  const rows = sessions.map(s => {
    const lbl = modeIcon[s.mode] || s.mode;
    let scoreStr;
    const pct = s.total ? Math.round(100 * s.correct / s.total) : 0;
    scoreStr = `<span class="history-score">${s.correct}/${s.total}</span><span class="history-score-pct"> · ${pct}%</span>`;
    return `<div class="history-row">
      <span class="history-mode">${lbl}</span>
      <span class="history-date">${fmtDate(s.date)}</span>
      ${scoreStr}
      <span style="color:var(--muted);font-size:12px;">${s.durationMs ? Math.round(s.durationMs/1000)+'s' : ''}</span>
    </div>`;
  }).join('');
  return `<div class="history-box">
    <div class="history-head">📊 Letzte Sessions</div>
    ${rows}
  </div>`;
}

function editDailyGoal(){
  const cur = Stats.state.dailyGoal || 20;
  const v = prompt('Neues Tagesziel (Anzahl Antworten pro Tag):', cur);
  if(v === null) return;
  const n = parseInt(v, 10);
  if(Number.isFinite(n) && n > 0 && n <= 999){
    Stats.setDailyGoal(n);
    updateStats();
    render();
  }
}


/* ═══════════════════════════════════════════════
   🃏 KARTEIKARTEN
   ═══════════════════════════════════════════════ */
function renderFlashPicker(){
  const app = document.getElementById('app');
  const total = poolWords().length;
  const sizes = [10, 20, 30, 50].filter(n => n <= total);
  const btns = sizes.map(n =>
    `<button class="fp-btn${n===20?' fp-featured':''}" onclick="startFlash(${n})">
      ${n} Karten<small>${n===20?'Empfohlen':'~'+Math.round(n*0.5)+' Min.'}</small>
    </button>`
  ).join('');
  const allBtn = total>0
    ? `<button class="fp-btn-all" onclick="startFlash(${total})">Alle ${total} Wörter anzeigen</button>`
    : `<p style="color:var(--muted);font-size:14px">Keine Wörter in dieser Kategorie.</p>`;
  app.innerHTML = `
    <div class="flash-picker">
      <div class="flash-picker-emoji">🃏</div>
      <h2>Karteikarten</h2>
      <p>Kategorie wählen und Anzahl der Karten:</p>
      ${categoryChipsHTML()}
      <div class="flash-picker-grid">${btns}</div>
      ${allBtn}
    </div>`;
}

function startFlash(size){
  flashShowPicker = false;
  deck = shuffle(poolWords()).slice(0, size);
  idx = 0; flipped = false;
  scrollToTop();
  render();
}


/* ── Gemeinsame Kopf-Elemente der Übungs-Modi ── */
function headRow(pos, total, extra){
  const pct = total ? Math.round((pos/total)*100) : 0;
  return '<div class="v3tr-head">'
    + '<span class="v31-pos">' + pos + ' / ' + total + '</span>'
    + '<div class="v3tr-prog"><i style="width:' + pct + '%"></i></div>'
    + (extra || '')
    + '</div>';
}
function dirBtn(){
  return '<button class="v3tr-btn" onclick="toggleDir()" aria-label="Lernrichtung wechseln">' + (learnDir === 'en-de' ? 'EN→DE' : 'DE→EN') + ' ⇄</button>';
}

/* Illustrations-Platzhalter (Kategorie-Farbverlauf + Symbol) für Wörter ohne Foto */
const CATEMOJI  = { 'Reisen':'✈️', 'Kitchen/Cooking':'🍳', 'TV':'🎬', 'Allgemein':'💭' };
const TYPEEMOJI = { 'Verb':'⚡', 'Adjektiv':'🎨', 'Adverb':'💨', 'Phrase':'💬', 'Praeposition':'🧭', 'Präposition':'🧭', 'Konjunktion':'🔗' };
const KNOWNCAT  = { 'Reisen':1, 'Kitchen/Cooking':1, 'TV':1, 'Allgemein':1 };
function phFor(w, size){
  const cat = (w && w.category) || '_default';
  const emoji = (w && w.wordType !== 'Nomen' && TYPEEMOJI[w.wordType]) || CATEMOJI[cat] || '📝';
  return '<div class="v3-ph ' + (size||'lg') + '" data-cat="' + (KNOWNCAT[cat] ? cat : '_default') + '">' + emoji + '</div>';
}

/* ═══════════════════════════════════════════════
   🃏 KARTEIKARTEN (Card-first)
   ═══════════════════════════════════════════════ */
function renderFlash(){
  const app = document.getElementById('app'); if(!app) return;
  if(!deck.length){ setTopbar('FREIE ÜBUNG', 'Karteikarten'); app.innerHTML = '<p>Keine Wörter vorhanden.</p>'; return; }
  if(flashShowPicker){ setTopbar('FREIE ÜBUNG', 'Karteikarten'); renderFlashPicker(); return; }
  if(idx >= deck.length){ setTopbar('FREIE ÜBUNG', 'Karteikarten'); renderSummary(); return; }

  const w = deck[idx];
  const src = getImg(w);
  const imgFront = src
    ? '<img class="fc-image" src="' + src + '" alt="' + esc(w.word) + '" referrerpolicy="no-referrer" loading="lazy" onerror="this.style.display=\'none\'">'
    : phFor(w, 'lg');
  const examplesHTML = w.examples.map(ex =>
    '<div class="back-ex"><button class="speak-btn speak-sm" onclick="event.stopPropagation();speakText(this)" title="Satz vorlesen">🔊</button><strong>📝 Beispiel</strong><span class="ex-text">' + ex + '</span></div>'
  ).join('');
  const enDE = learnDir === 'en-de';
  const front = enDE
    ? imgFront + '<div class="fc-word">' + w.word + '</div><div class="speak-row"><button class="speak-btn" onclick="speakWord(\'' + w.word.replace(/'/g, "\\'") + '\')">🔊</button><span class="fc-pronunciation">' + w.pronunciation + '</span></div><div class="fc-badges"><span class="badge badge-type">' + w.wordType + '</span><span class="badge ' + diffColor(w.difficulty) + '">' + w.difficulty + '</span></div><div class="fc-front-example"><button class="speak-btn speak-sm" onclick="event.stopPropagation();speakText(this)" title="Satz vorlesen">🔊</button>📝 „<span class="ex-text">' + w.examples[0] + '</span>"</div><div class="fc-hint">Tippe, um umzudrehen ↕</div>'
    : imgFront + '<div class="fc-word" style="font-size:20px;text-align:center;padding:0 12px">' + w.translation + '</div><div class="fc-badges" style="margin-top:10px"><span class="badge badge-type">' + w.wordType + '</span><span class="badge ' + diffColor(w.difficulty) + '">' + w.difficulty + '</span></div><div class="fc-front-example">📝 „' + (w.exampleDE || w.examples[0]) + '"</div><div class="fc-hint">Tippe, um umzudrehen ↕</div>';
  const back = enDE
    ? '<div class="back-section-label">📖 Definition</div><div class="back-def">' + w.definition + '</div><div class="back-section-label">📝 Beispiele</div>' + examplesHTML + '<div class="back-translation-small">🇩🇪 ' + w.translation + '</div>'
    : '<div class="fc-word" style="font-size:28px;margin-bottom:6px">' + w.word + '</div><div class="speak-row" style="margin-bottom:12px"><button class="speak-btn" onclick="speakWord(\'' + w.word.replace(/'/g, "\\'") + '\')">🔊</button><span class="fc-pronunciation">' + w.pronunciation + '</span></div><div class="back-section-label">📖 Definition</div><div class="back-def">' + w.definition + '</div><div class="back-section-label">📝 Beispiele</div>' + examplesHTML;
  const backBtn = '<button class="v3tr-btn icon" onclick="prevCard()" ' + (idx === 0 ? 'disabled style="opacity:.4"' : '') + ' aria-label="Vorherige Karte">←</button>';
  app.innerHTML = headRow(idx+1, deck.length, backBtn + dirBtn())
    + '<div class="v3-scene"><div class="scene">'
    + '<div class="flashcard' + (flipped ? ' flipped' : '') + '" id="fc" onclick="flipCard()">'
    + '<div class="face">' + front + '</div>'
    + '<div class="face face-back">' + back + '</div>'
    + '</div></div></div>'
    + '<div class="fc-actions" id="fcActions" style="display:' + (flipped ? 'flex' : 'none') + '">'
    + '<button class="btn btn-err" onclick="markCard(false)">✗ Nochmal</button>'
    + '<button class="btn btn-ok" onclick="markCard(true)">✓ Gewusst!</button>'
    + '</div>';
  setTopbar('KARTE ' + (idx+1) + ' / ' + deck.length, 'Karteikarten');
}

function flipCard(){
  flipped = !flipped;
  const fc = document.getElementById('fc');
  if(fc) fc.classList.toggle('flipped', flipped);
  const acts = document.getElementById('fcActions');
  if(acts) acts.style.display = flipped ? 'flex' : 'none';
  // Auto-Aussprache beim Aufdecken (Option in den Einstellungen)
  try { if(flipped && getAutoSpeak() && deck[idx]) speakWord(deck[idx].word, 'en'); } catch(e){}
}


function markCard(wasCorrect){
  const w = deck[idx];
  if(w){
    if(wasCorrect) SRS.markCorrect(w.id); else SRS.markWrong(w.id);
  }
  if(wasCorrect){ correct++; } else { incorrect++; }
  Stats.recordAnswer(wasCorrect, 'flash');
  updateStats();
  idx++;
  flipped = false;
  scrollToTop();
  render();
}

function prevCard(){
  if(idx > 0){ idx--; flipped = false; render(); }
}


/* ═══════════════════════════════════════════════
   ❓ QUIZ (Multiple Choice, Card-first, Hör-Modus)
   ═══════════════════════════════════════════════ */
let quizChipsOpen = false;
let listenQuiz = false;
function toggleQuizChips(){ quizChipsOpen = !quizChipsOpen; try { render(); } catch(e){} }
function toggleListenQuiz(){ listenQuiz = !listenQuiz; try { render(); } catch(e){} }

function renderQuiz(){
  const app = document.getElementById('app'); if(!app) return;
  setTopbar('MULTIPLE CHOICE', 'Quiz');
  if(WORDS.length < 2){ app.innerHTML = '<p>Mindestens 2 Wörter für den Quiz-Modus benötigt.</p>'; return; }
  if(!deck.length || idx >= deck.length){ renderRoundResult('quiz'); return; }

  const w = deck[idx];
  const enDE = learnDir === 'en-de';

  // Antwort-Optionen: 1 richtige + 3 falsche aus dem gefilterten Pool
  const wrong = shuffle(poolWords().filter(x => x.id !== w.id)).slice(0, 3);
  quizChoices = shuffle([w].concat(wrong));
  quizCorrectIdx = quizChoices.findIndex(c => c.id === w.id);
  quizAnswered = false;

  const qWord = enDE ? w.word : w.translation;
  const qSub  = enDE ? 'Was bedeutet dieses Wort?' : 'Wie lautet das englische Wort?';
  const choices = quizChoices.map((c, i) =>
    '<button class="choice" id="ch' + i + '" onclick="answerQuiz(' + i + ')">' + (enDE ? c.translation : c.word) + '</button>'
  ).join('');

  const src = getImg(w);
  const photo = '<div class="v32-photo">' + phFor(w, '')
    + (src ? '<img src="' + src + '" alt="' + esc(w.word) + '" referrerpolicy="no-referrer" loading="lazy" onerror="this.style.display=\'none\'">' : '')
    + '</div>';

  const ex = (() => {
    const e = w.examples[0];
    if(enDE){
      return '📝 ' + e.replace(new RegExp(w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), m => '<span class="ex-blank">' + '_'.repeat(m.length) + '</span>');
    }
    return '📝 ' + (w.exampleDE || e);
  })();

  const catBtn = '<button class="v3tr-btn" onclick="toggleQuizChips()">' + (catFilter === 'all' ? 'Alle' : catLabel(catFilter)) + ' ▾</button>';
  const listenBtn = '<button class="v3tr-btn icon' + (listenQuiz ? ' v32-listen-on' : '') + '" onclick="toggleListenQuiz()" aria-label="Hör-Modus" title="Hör-Modus: Wort nur hören">🎧</button>';

  const speakArg = '\'' + (enDE ? w.word : w.translation).replace(/'/g, "\\'") + '\',\'' + (enDE ? 'en' : 'de') + '\'';
  let qCard;
  if(listenQuiz){
    // Hör-Modus: kein Wort, kein Foto, kein Beispiel — nur Ohr & Auswahl
    qCard = '<div class="v32-q" style="text-align:center">'
      + '<div class="v32-sub">Hör zu — welche Bedeutung passt?</div>'
      + '<button class="v32-listen-big" onclick="speakWord(' + speakArg + ')" aria-label="Wort anhören">🔊</button>'
      + '<div class="v32-meta" style="justify-content:center"><span class="badge badge-type">' + w.wordType + '</span><span class="badge ' + diffColor(w.difficulty) + '">' + w.difficulty + '</span></div>'
      + '</div>';
  } else {
    qCard = '<div class="v32-q"><div class="v32-q-row">' + photo
      + '<div class="v32-main"><div class="v32-sub">' + qSub + '</div><div class="v32-word">' + qWord + '</div>'
      + '<div class="v32-meta"><span class="badge badge-type">' + w.wordType + '</span><span class="badge ' + diffColor(w.difficulty) + '">' + w.difficulty + '</span>'
      + '<button class="speak-btn" onclick="speakWord(' + speakArg + ')">🔊</button>'
      + (enDE ? '<span class="v32-pron">' + w.pronunciation + '</span>' : '')
      + '</div></div></div>'
      + '<div class="v32-ex">' + ex + '</div></div>';
  }

  app.innerHTML = headRow(idx+1, deck.length, catBtn + listenBtn + dirBtn())
    + (quizChipsOpen ? '<div class="v32-chips">' + categoryChipsHTML() + '</div>' : '')
    + qCard
    + '<div class="quiz-choices">' + choices + '</div>'
    + '<div id="quizFeedback"></div>'
    + '<div class="nav-row"><button class="btn btn-ghost btn-sm" onclick="nextQuiz()" id="nextQuizBtn" style="display:none">Weiter →</button></div>';

  setTopbar((listenQuiz ? 'HÖREN ' : 'FRAGE ') + (idx+1) + ' / ' + deck.length, 'Quiz');
  if(listenQuiz) setTimeout(() => { try { speakWord(enDE ? w.word : w.translation, enDE ? 'en' : 'de'); } catch(e){} }, 350);

  // Lazy-Load: Bild nachladen, wenn (noch) nicht im Cache
  if(!src && wikiTitleFor(w.word)){
    fetchWikiImage(w.word).then(url => {
      if(!url) return;
      const ph = document.querySelector('.v32-photo');
      if(ph && !ph.querySelector('img')) ph.insertAdjacentHTML('beforeend', '<img src="' + url + '" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.style.display=\'none\'">');
    });
  }
}


function setLearnDir(dir){
  if(quizAutoTimer){ clearTimeout(quizAutoTimer); quizAutoTimer = null; }
  learnDir = dir;
  try { localStorage.setItem('etLearnDir', dir); } catch(e) {}  // Richtung überlebt App-Neustart
  quizAnswered = false;
  flipped = false;
  trainFlipped = false;
  fillChecked = false;
  render();
}


function answerQuiz(chosen){
  if(quizAnswered) return;
  quizAnswered = true;
  const isOk = chosen === quizCorrectIdx;
  const w = deck[idx];
  if(w){
    if(isOk) SRS.markCorrect(w.id); else SRS.markWrong(w.id);
  }
  if(isOk){
    correct++; roundCorrect++; combo++;
    if(combo > bestComboInRound) bestComboInRound = combo;
  } else {
    incorrect++; combo = 0;
    if(w) roundWrongWords.push(w);
  }
  Stats.recordAnswer(isOk, 'quiz');
  if(combo >= 3) Stats.recordCombo(combo);
  updateStats();

  quizChoices.forEach((_,i)=>{
    const btn = document.getElementById(`ch${i}`);
    btn.disabled = true;
    if(i===quizCorrectIdx) btn.classList.add('correct');
    else if(i===chosen && !isOk) btn.classList.add('wrong');
  });

  if(quizAutoTimer){ clearTimeout(quizAutoTimer); quizAutoTimer = null; }

  const fb = document.getElementById('quizFeedback');
  fb.className = `quiz-feedback ${isOk?'ok':'err'}`;
  const comboBadge = (isOk && combo >= 3) ? ` <span class="combo-badge">🔥 ${combo} in Folge</span>` : '';

  if(isOk){
    fb.innerHTML = `🎉 Richtig!${comboBadge}<div class="auto-adv-bar"><div class="auto-adv-fill"></div></div>`;
    // Auto-advance nach 1.5s; Weiter-Button als Abbruch
    document.getElementById('nextQuizBtn').textContent = 'Jetzt weiter →';
    document.getElementById('nextQuizBtn').style.display = 'inline-flex';
    showMobileNext('Jetzt weiter →', nextQuiz);
    quizAutoTimer = setTimeout(()=>{ quizAutoTimer = null; nextQuiz(); }, 1500);
  } else {
    fb.innerHTML = `✗ Leider falsch. Richtig: „${deck[idx].translation}"`;
    document.getElementById('nextQuizBtn').textContent = 'Weiter →';
    document.getElementById('nextQuizBtn').style.display = 'inline-flex';
    showMobileNext('Weiter →', nextQuiz);
  }
}

function nextQuiz(){
  if(quizAutoTimer){ clearTimeout(quizAutoTimer); quizAutoTimer = null; }
  hideMobileNext();
  idx++;
  if(idx >= deck.length){
    renderRoundResult('quiz');
  } else {
    scrollToTop();
    render();
  }
}


/* ═══════════════════════════════════════════════
   ✏️ LÜCKENTEXT (Aufgabe sofort, Tastatur-sicher)
   ═══════════════════════════════════════════════ */
function renderFill(){
  const app = document.getElementById('app'); if(!app) return;
  setTopbar('SELBER TIPPEN', 'Lückentext');
  if(!deck.length){ app.innerHTML = '<p>Keine Wörter vorhanden.</p>'; return; }
  if(idx >= deck.length){ renderRoundResult('fill'); return; }

  const w = deck[idx];
  const enDE = learnDir === 'en-de';
  let cardHTML;
  if(enDE){
    const ex = w.examples[Math.floor(Math.random() * w.examples.length)];
    const blanked = ex.replace(new RegExp(w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '<span class="blank">_____</span>');
    cardHTML = '<div class="fill-label">🇩🇪 Übersetzung: <strong>' + w.translation + '</strong> &nbsp;|&nbsp; ' + w.wordType + ' &nbsp;<span class="badge ' + diffColor(w.difficulty) + '">' + w.difficulty + '</span></div>'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><button class="speak-btn" onclick="speakWord(\'' + w.word.replace(/'/g, "\\'") + '\')">🔊</button><span style="font-size:13px;color:var(--muted)">' + w.pronunciation + '</span></div>'
      + '<div class="fill-label">Ergänze den Satz:</div><div class="fill-sentence">' + blanked + '</div>';
  } else {
    cardHTML = '<div class="fill-label">🇬🇧 Englisch: <strong>' + w.word + '</strong> &nbsp;|&nbsp; ' + w.wordType + ' &nbsp;<span class="badge ' + diffColor(w.difficulty) + '">' + w.difficulty + '</span></div>'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><button class="speak-btn" onclick="speakWord(\'' + w.word.replace(/'/g, "\\'") + '\')">🔊</button><span style="font-size:13px;color:var(--muted)">' + w.pronunciation + '</span></div>'
      + '<div class="fill-label">Was ist die deutsche Übersetzung?</div><div class="fill-sentence" style="font-size:15px;color:var(--muted)">📝 „' + w.examples[0] + '"</div>';
  }
  fillChecked = false;
  const skipBtn = '<button class="v3tr-btn" onclick="skipFill()" id="skipBtn">Überspringen →</button>';
  app.innerHTML = headRow(idx+1, deck.length, dirBtn() + skipBtn)
    + '<div class="fill-card">' + cardHTML
    + '<div class="fill-input-row" style="margin-top:14px">'
    + '<input class="fill-input" id="fillInput" type="text" placeholder="' + (enDE ? 'Englisches Wort…' : 'Deutsche Übersetzung…') + '" onkeydown="if(event.key===\'Enter\')checkFill()" oninput="onFillInput(this)" autocomplete="off" autocorrect="off" spellcheck="false">'
    + '<button class="btn btn-primary" onclick="checkFill()">Prüfen</button>'
    + '</div><div id="fillResult"></div></div>';
  setTopbar('AUFGABE ' + (idx+1) + ' / ' + deck.length, 'Lückentext');
  setTimeout(() => { const i = document.getElementById('fillInput'); if(i){ i.focus(); i.scrollIntoView({ behavior:'smooth', block:'center' }); } }, 150);
}


function skipFill(){
  // beim Überspringen wird die Antwort als „nicht beantwortet" gezählt
  const w = deck[idx];
  if(w && !fillChecked){
    incorrect++;
    combo = 0;
    roundWrongWords.push(w);
    Stats.recordAnswer(false, 'fill');
    updateStats();
  }
  hideMobileNext();
  idx++;
  if(idx >= deck.length) renderRoundResult('fill');
  else { scrollToTop(); render(); }
}

function onFillInput(input){
  if(fillChecked) return;
  const w = deck[idx];
  const val = input.value.trim().toLowerCase();
  const liveOk = learnDir==='en-de' ? (val&&val===w.word.toLowerCase()) : (()=>{const ts=w.translation.split(',').map(t=>t.trim().toLowerCase());return val&&(ts.some(t=>val===t)||val===w.translation.toLowerCase());})();
  if(liveOk){input.classList.add('live-ok');}else{input.classList.remove('live-ok');}
}

function checkFill(){
  if(fillChecked) return;
  fillChecked = true;
  const input = document.getElementById('fillInput');
  const answer = input.value.trim();
  const w = deck[idx];
  input.classList.remove('live-ok');
  const enDE_chk = learnDir === 'en-de';
  let isOk;
  if(enDE_chk){ isOk = answer.toLowerCase() === w.word.toLowerCase(); }
  else { const ts=w.translation.split(',').map(t=>t.trim().toLowerCase()); isOk=ts.some(t=>answer.toLowerCase()===t)||answer.toLowerCase()===w.translation.toLowerCase(); }

  if(w){
    if(isOk) SRS.markCorrect(w.id); else SRS.markWrong(w.id);
  }
  if(isOk){
    correct++; roundCorrect++; combo++;
    if(combo > bestComboInRound) bestComboInRound = combo;
  } else {
    incorrect++; combo = 0;
    if(w) roundWrongWords.push(w);
  }
  Stats.recordAnswer(isOk, 'fill');
  if(combo >= 3) Stats.recordCombo(combo);
  updateStats();

  input.classList.add(isOk?'ok':'err');
  input.disabled = true;

  const res = document.getElementById('fillResult');
  const fullEx = w.examples[0];
  const comboBadge = (isOk && combo >= 3) ? ` <span class="combo-badge">🔥 ${combo} in Folge</span>` : '';
  res.className = `fill-result ${isOk?'ok':'err'}`;
  res.innerHTML = isOk
    ? `✓ Richtig!${comboBadge} <em>${fullEx}</em>`
    : `✗ Nicht ganz. Das richtige Wort ist: <strong>${w.word}</strong><br><em>${fullEx}</em>`;

  const skip = document.getElementById('skipBtn');
  if(skip){
    skip.textContent = 'Weiter →';
    skip.onclick = ()=>{
      hideMobileNext();
      idx++;
      if(idx >= deck.length) renderRoundResult('fill');
      else { scrollToTop(); render(); }
    };
  }
  showMobileNext('Weiter →', ()=>{
    idx++;
    if(idx >= deck.length) renderRoundResult('fill');
    else { scrollToTop(); render(); }
  });
}


/* ═══════════════════════════════════════════════
   🏁 10er-RUNDEN-AUSWERTUNG (Quiz / Lückentext)
   ═══════════════════════════════════════════════ */
function renderRoundResult(rMode){
  hideMobileNext();
  scrollToTop();
  const app = document.getElementById('app');
  const total = deck.length || ROUND_SIZE;
  const ok = roundCorrect;
  const wrong = total - ok;
  const pct = total ? Math.round((ok/total)*100) : 0;
  const isPerfect = ok === total && total > 0;
  const durationMs = roundStartTs ? (Date.now() - roundStartTs) : 0;
  const durSec = Math.round(durationMs / 1000);

  // Bonus für perfekte Runde
  let bonusXP = 0;
  if(isPerfect){
    Stats.recordPerfectRound();
    bonusXP = 50;
  }

  // Session in History speichern
  Stats.recordSession({ mode: rMode, total, correct: ok, durationMs });
  updateStats();

  let msg, emoji;
  if(isPerfect){ emoji = '🌟'; msg = 'Perfekte Runde! 10 von 10. +50 XP Bonus!'; }
  else if(pct >= 80){ emoji = '🏆'; msg = 'Sehr stark!'; }
  else if(pct >= 50){ emoji = '💪'; msg = 'Solide Runde – weiter so.'; }
  else { emoji = '📚'; msg = 'Übung macht den Meister.'; }

  const wrongList = roundWrongWords.length
    ? `<div class="round-wrong-list">
        <div class="round-wrong-head">📝 Diese Wörter haben gehakt:</div>
        ${roundWrongWords.map(w =>
          `<div class="round-wrong-item">
             <strong>${w.word}</strong>
             <span class="muted">— ${w.translation}</span>
           </div>`).join('')}
       </div>`
    : '';

  app.innerHTML = `
    <div class="round-result">
      <div class="round-emoji">${emoji}</div>
      <h2 class="round-title">Runde abgeschlossen!</h2>
      <p class="round-msg">${msg}</p>
      <div class="round-score-circle">
        <div class="round-score-num">${ok}<span class="round-score-of">/${total}</span></div>
        <div class="round-score-pct">${pct} %</div>
      </div>
      <div class="round-mini-stats">
        <div class="rm"><div class="rm-num">${ok}</div><div class="rm-lbl">Richtig</div></div>
        <div class="rm rm-err"><div class="rm-num">${wrong}</div><div class="rm-lbl">Falsch</div></div>
        <div class="rm"><div class="rm-num">🔥 ${bestComboInRound}</div><div class="rm-lbl">Combo</div></div>
        <div class="rm"><div class="rm-num">${durSec}s</div><div class="rm-lbl">Dauer</div></div>
        ${bonusXP ? `<div class="rm rm-bonus"><div class="rm-num">+${bonusXP} XP</div><div class="rm-lbl">Bonus</div></div>` : ''}
      </div>
      ${wrongList}
    </div>`;
  // Weiter-Button: auf Mobile sticky, auf Desktop sichtbar als normaler Button
  showMobileNext('🔄 Weiter mit 10 neuen', () => nextRound());
  // Auf Desktop: zusätzlich inline-Button unter dem Result
  if(window.innerWidth > 540){
    const acts = document.createElement('div');
    acts.style.cssText = 'display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:18px;';
    acts.innerHTML = `<button class="btn btn-primary" onclick="nextRound()">🔄 Weiter mit 10 neuen</button>
      <button class="btn btn-outline" onclick="setMode('train')">🧠 Training</button>`;
    document.querySelector('.round-result').appendChild(acts);
  }
}

function nextRound(){
  idx = 0;
  quizAnswered = false;
  fillChecked = false;
  deck = buildRoundDeck();
  resetRound();
  render();
}


/* ═══════════════════════════════════════════════
   🏆 ZUSAMMENFASSUNG (alt — Karteikarten-Modus)
   ═══════════════════════════════════════════════ */
function renderSummary(){
  const app = document.getElementById('app');
  const total = correct + incorrect;
  const pct = total ? Math.round((correct/total)*100) : 0;
  let emoji = pct>=80?'🏆':pct>=50?'💪':'📚';
  let msg = pct>=80?'Ausgezeichnet! Du kennst deine Wörter sehr gut!'
           :pct>=50?'Gut gemacht! Übe weiter und du wirst es bald perfekt beherrschen.'
           :'Kein Problem – Übung macht den Meister!';

  app.innerHTML = `
    <div class="summary-card">
      <div class="summary-emoji">${emoji}</div>
      <h2>Runde beendet!</h2>
      <p>${msg}</p>
      <div class="summary-stats">
        <div class="ss ss-ok"><div class="ss-num">${correct}</div><div class="ss-label">Richtig</div></div>
        <div class="ss ss-err"><div class="ss-num">${incorrect}</div><div class="ss-label">Falsch</div></div>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="restartMode()">🔄 Nochmal trainieren</button>
        <button class="btn btn-outline" onclick="setMode('list')">📋 Wortliste ansehen</button>
      </div>
    </div>`;
}

function restartMode(){
  correct = 0; incorrect = 0;
  updateStats();
  idx = 0; flipped = false; quizAnswered = false; fillChecked = false;
  deck = shuffle(WORDS);
  render();
}


/* ═══════════════════════════════════════════════
   📋 WORTLISTE (Status-Gruppen, Sticky-Suche, Bild-Filter)
   ═══════════════════════════════════════════════ */
let groupsOpen = { due:true, learn:false, fresh:false, master:false };
let onlyImg = false, filtersOpen = false;
function toggleListGroup(k){ groupsOpen[k] = !groupsOpen[k]; renderList(); }
function toggleListImg(){ onlyImg = !onlyImg; renderList(); }
function toggleListFilters(){ filtersOpen = !filtersOpen; renderList(); }

function wordCard(w){
  const src = getImg(w);
  const thumb = src
    ? '<img class="wc-thumb" src="' + src + '" alt="' + esc(w.word) + '" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null;this.outerHTML=phFor(WORDS.find(x=>x.id===' + w.id + '),\'sm\')">'
    : phFor(w, 'sm');
  const detailImg = src ? '<img class="wc-detail-img" src="' + src + '" alt="' + esc(w.word) + '" referrerpolicy="no-referrer" loading="lazy" onerror="this.style.display=\'none\'">' : '';
  const e = SRS.state[w.id];
  const lvl = e ? (e.level || 0) : 0;
  const isDue = e ? (e.nextDue <= SRS.todayISO() && lvl < 7) : false;
  const exHTML = w.examples.map(x => '<div class="wc-ex">📝 ' + esc(x) + '</div>').join('');
  return '<div class="word-card' + (listOpen[w.id] ? ' open' : '') + '" onclick="toggleCard(event,' + w.id + ')">'
    + '<div class="wc-top">' + thumb
    + '<div class="wc-body"><div class="wc-title-row"><span class="wc-word">' + esc(w.word) + '</span><span class="wc-pron">' + esc(w.pronunciation) + '</span>' + (isDue ? '<span class="due-pill">Fällig</span>' : '') + '</div>'
    + '<div class="wc-translation">' + esc(w.translation) + '</div></div>'
    + '<div class="wc-meta"><span class="level-badge lvl-' + lvl + '">L' + lvl + '</span><span class="badge ' + diffColor(w.difficulty) + '">' + w.difficulty + '</span><span class="wc-chev">▾</span></div>'
    + '</div>'
    + '<div class="wc-detail' + (listOpen[w.id] ? ' open' : '') + '" id="detail' + w.id + '">' + detailImg
    + '<p><strong>📖 Definition:</strong> ' + esc(w.definition) + '</p>' + exHTML
    + '<p style="font-size:11px;color:var(--muted);margin-top:6px">' + esc(w.wordType) + ' · ' + esc(w.category) + ' · Hinzugefügt: ' + esc(w.dateAdded) + '</p>'
    + '</div></div>';
}

function renderList(){
  const app = document.getElementById('app'); if(!app) return;
  const q = listSearch.trim().toLowerCase();
  const filtered = WORDS.filter(w => {
    if(listFilterType !== 'Alle' && w.wordType !== listFilterType) return false;
    if(listFilterCat !== 'Alle' && w.category !== listFilterCat) return false;
    if(onlyImg && !getImg(w)) return false;
    if(!q) return true;
    return [w.word, w.translation, w.definition].concat(w.examples || []).join(' ').toLowerCase().indexOf(q) >= 0;
  });
  const flat = !!(q || onlyImg || listFilterType !== 'Alle' || listFilterCat !== 'Alle');

  const types = ['Alle'].concat(Array.from(new Set(WORDS.map(w => w.wordType))));
  const cats = ['Alle'].concat(CATEGORIES);
  let filterHTML = '';
  if(filtersOpen){
    filterHTML = '<div class="v31-filterrow">' + types.map(t =>
        '<button class="v31-fbtn' + (listFilterType === t ? ' active' : '') + '" onclick="setFilterType(\'' + t + '\')">' + t + '</button>'
      ).join('') + '</div>'
      + '<div class="v31-filterrow">' + cats.map(c =>
        '<button class="v31-fbtn' + (listFilterCat === c ? ' active' : '') + '" onclick="setFilterCat(\'' + c.replace(/'/g, "\\'") + '\')">' + c + '</button>'
      ).join('') + '</div>';
  }

  let html = '<div class="v31-sticky">'
    + '<div class="search-bar' + (listSearch ? ' has-value' : '') + '">'
    + '<span class="eta-search-icon">' + svg('search',15) + '</span>'
    + '<input id="listSearchInput" type="text" placeholder="Suche in ' + WORDS.length + ' Wörtern…" value="' + esc(listSearch) + '" oninput="onSearchInput(this.value)" autocomplete="off" spellcheck="false">'
    + '<button class="search-clear" onclick="clearSearch(event)" aria-label="Suche leeren">✕</button>'
    + '</div>'
    + '<div class="v31-filterrow">'
    + '<button class="v31-fbtn' + (filtersOpen ? ' active' : '') + '" onclick="toggleListFilters()">' + svg('layers',13) + ' Filter' + ((listFilterType !== 'Alle' || listFilterCat !== 'Alle') ? ' ●' : '') + '</button>'
    + '<button class="v31-fbtn' + (onlyImg ? ' active' : '') + '" onclick="toggleListImg()">📷 Nur mit Bild</button>'
    + '<span style="margin-left:auto;font-size:11px;color:var(--muted);align-self:center">' + filtered.length + ' / ' + WORDS.length + '</span>'
    + '</div>' + filterHTML + '</div>';

  if(!filtered.length){
    html += '<div class="v31-empty">Keine Wörter gefunden.</div>';
  } else if(flat){
    html += filtered.map(wordCard).join('');
  } else {
    const today = SRS.todayISO();
    const groups = [
      { k:'due',    label:'Fällig heute',   words:[] },
      { k:'learn',  label:'In Bearbeitung', words:[] },
      { k:'fresh',  label:'Neu',            words:[] },
      { k:'master', label:'Gemeistert',     words:[] }
    ];
    filtered.forEach(w => {
      const e = SRS.state[w.id];
      if(!e || ((e.level||0) === 0 && ((e.ok||0)+(e.wrong||0)) === 0)) groups[2].words.push(w);
      else if((e.level||0) >= 7) groups[3].words.push(w);
      else if(e.nextDue <= today) groups[0].words.push(w);
      else groups[1].words.push(w);
    });
    groups.forEach(g => {
      if(!g.words.length) return;
      const open = groupsOpen[g.k];
      html += '<div class="v31-group-head' + (open ? ' open' : '') + '" onclick="toggleListGroup(\'' + g.k + '\')">'
        + g.label + '<span class="cnt ' + g.k + '">' + g.words.length + '</span><span class="chev">' + svg('chevronRight',14) + '</span></div>';
      if(open) html += g.words.map(wordCard).join('');
    });
  }
  app.innerHTML = html;
  if(document.activeElement && document.activeElement.id !== 'listSearchInput'){
    const si = document.getElementById('listSearchInput');
    if(si && listSearch){ si.focus(); si.setSelectionRange(listSearch.length, listSearch.length); }
  }
}


function setFilterType(f){ listFilterType=f; renderList(); }
function setFilterCat(f){  listFilterCat=f;  renderList(); }
function toggleCard(evt, id){
  // Ignore clicks that originate inside the search input or its clear button
  const t = evt && evt.target;
  if(t && (t.tagName==='INPUT' || (t.closest && t.closest('.search-bar')))) return;
  listOpen[id]=!listOpen[id]; renderList();
}
function onSearchInput(v){
  listSearch = v;
  renderList();
}
function clearSearch(e){
  if(e){ e.stopPropagation(); }
  listSearch = '';
  renderList();
  const si = document.getElementById('listSearchInput');
  if(si) si.focus();
}


/* ═══════════════════════════════════════════════
   ⌨️ TIPPMODUS (beide Richtungen, Tippfehler-Toleranz)
   EN→DE: englisches Wort sehen (+🔊) → deutsche Übersetzung tippen
   DE→EN: deutsches Wort sehen → englisches Wort tippen ('to ' optional)
   ═══════════════════════════════════════════════ */
function norm(s){ return String(s||'').toLowerCase().replace(/^to\s+/, '').replace(/[.,!?"„“]/g, '').trim(); }
function lev(a, b){
  a = norm(a); b = norm(b);
  const m = a.length, n = b.length;
  if(!m) return n; if(!n) return m;
  let prev = [], cur, i, j;
  for(j = 0; j <= n; j++) prev[j] = j;
  for(i = 1; i <= m; i++){
    cur = [i];
    for(j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j-1] + 1, prev[j-1] + (a[i-1] === b[j-1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
function tolerant(dist, target){ return dist <= (norm(target).length > 6 ? 2 : 1); }

let typeDeck = [], typeIdx = 0, typeChecked = false, typeOk = 0, typeWrong = 0, typeLabel = 'Tippmodus';

function startTypeMode(customDeck, label){
  typeDeck = (customDeck && customDeck.length) ? customDeck.slice(0, 10) : (() => {
    let d = [];
    try { d = SRS.dueQueue(WORDS).slice(0, 10); } catch(e){}
    if(!d.length) d = shuffle(WORDS.slice()).slice(0, 10);
    return d;
  })();
  typeIdx = 0; typeChecked = false; typeOk = 0; typeWrong = 0;
  typeLabel = label || 'Tippmodus';
  mode = 'type';
  setActiveTab(null);
  scrollToTop();
  renderTypeMode();
  updateFab();
}

function renderTypeMode(){
  const app = document.getElementById('app'); if(!app) return;
  const enDE = learnDir === 'en-de';

  if(typeIdx >= typeDeck.length){
    setTopbar('RUNDE BEENDET', typeLabel);
    app.innerHTML = '<div class="t33-card t33-result"><div class="t33-prompt">Runde beendet</div>'
      + '<div class="big">' + typeOk + '/' + typeDeck.length + '</div>'
      + '<div style="color:var(--muted);font-size:14px;margin-bottom:18px">richtig getippt</div>'
      + '<button class="t33-btn" onclick="startTypeMode()">Neue Runde</button>'
      + '<button class="eta-set-btn" style="margin-top:8px" onclick="setMode(\'today\')">Zurück zur Übersicht</button></div>';
    return;
  }

  const w = typeDeck[typeIdx];
  const pct = Math.round((typeIdx / typeDeck.length) * 100);
  const shown  = enDE ? w.word : w.translation;
  const prompt = enDE ? 'Was heisst das auf Deutsch?' : 'Wie heisst das auf Englisch?';
  const ph     = enDE ? 'deutsche Übersetzung tippen…' : 'englisches Wort tippen…';
  const speak  = enDE ? '<button class="speak-btn" onclick="speakWord(\'' + w.word.replace(/'/g, "\\'") + '\')">🔊</button>' : '';

  app.innerHTML =
    '<div class="v3tr-head"><span class="v31-pos">' + (typeIdx + 1) + ' / ' + typeDeck.length + '</span>'
    + '<div class="v3tr-prog"><i style="width:' + pct + '%"></i></div>'
    + '<span class="v31-pos" style="color:var(--ok)">✓ ' + typeOk + '</span><span class="v31-pos" style="color:var(--err)">✗ ' + typeWrong + '</span>'
    + dirBtn()
    + '</div>'
    + '<div class="t33-card">'
    + '<div class="t33-prompt">' + prompt + '</div>'
    + '<div class="t33-word">' + esc(shown) + '</div>'
    + '<div class="t33-badges"><span class="badge badge-type">' + (w.wordType||'') + '</span><span class="badge ' + diffColor(w.difficulty) + '">' + (w.difficulty||'') + '</span>' + speak + '</div>'
    + '<input class="t33-input" id="t33Input" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="' + ph + '">'
    + '<div class="t33-fb" id="t33Fb"></div>'
    + '<button class="t33-btn" id="t33Btn" onclick="checkTypeMode()">Prüfen</button>'
    + '</div>';
  setTopbar('TIPPEN ' + (typeIdx + 1) + ' / ' + typeDeck.length, typeLabel);
  const inp = document.getElementById('t33Input');
  if(inp){
    inp.addEventListener('keydown', ev => { if(ev.key === 'Enter'){ ev.preventDefault(); checkTypeMode(); } });
    setTimeout(() => inp.focus(), 120);
  }
}

function checkTypeMode(){
  const w = typeDeck[typeIdx]; if(!w) return;
  const inp = document.getElementById('t33Input');
  const btn = document.getElementById('t33Btn');
  const fb  = document.getElementById('t33Fb');
  if(!inp || !btn || !fb) return;

  if(!typeChecked){
    const enDE = learnDir === 'en-de';
    const answer = inp.value;
    let isOk = false, solution = '';
    if(enDE){
      // deutsche Übersetzung: jede Komma-Variante zählt, beste per Levenshtein
      const variants = String(w.translation).split(',').map(t => t.trim()).filter(Boolean);
      solution = w.translation;
      isOk = norm(answer).length > 0 && variants.some(v => tolerant(lev(answer, v), v));
    } else {
      solution = w.word;
      isOk = norm(answer).length > 0 && tolerant(lev(answer, w.word), w.word);
    }
    typeChecked = true;
    if(isOk){
      typeOk++; inp.classList.add('ok');
      fb.className = 't33-fb ok'; fb.innerHTML = svg('check', 15, 2.5) + ' Richtig!' + (lev(answer, enDE ? w.translation.split(',')[0] : w.word) > 0 ? ' <span style="font-weight:500;color:var(--muted)">(kleiner Tippfehler verziehen)</span>' : '');
      try { SRS.markCorrect(w.id); } catch(e){}
    } else {
      typeWrong++; inp.classList.add('err');
      fb.className = 't33-fb err'; fb.innerHTML = svg('x', 15, 2.5) + ' Lösung: <strong>&nbsp;' + esc(solution) + '</strong>';
      try { SRS.markWrong(w.id); } catch(e){}
    }
    try { Stats.recordAnswer(isOk, 'type'); updateStats(); } catch(e){}
    inp.disabled = true;
    btn.textContent = (typeIdx + 1 >= typeDeck.length) ? 'Ergebnis' : 'Weiter';
  } else {
    typeIdx++; typeChecked = false;
    renderTypeMode();
  }
}

/* ═══════════════════════════════════════════════
   📉 SCHWIERIGE WÖRTER (Fehlerquote > 40 %)
   ═══════════════════════════════════════════════ */
function getHardWords(){
  const out = [];
  WORDS.forEach(w => {
    const e = SRS.state[w.id]; if(!e) return;   // read-only, kein SRS.entry()!
    const t = (e.ok||0) + (e.wrong||0);
    if(t >= 2 && (e.wrong||0)/t > 0.4) out.push({ w: w, rate: (e.wrong||0)/t, wrong: e.wrong||0 });
  });
  out.sort((a, b) => b.rate - a.rate);
  return out;
}

function renderHardList(){
  const app = document.getElementById('app'); if(!app) return;
  mode = 'hardlist';
  setActiveTab(null);
  const hard = getHardWords();
  let html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">'
    + '<button class="eta-set-btn" style="width:auto;padding:8px 12px;margin:0" onclick="setMode(\'today\')">' + svg('chevronRight',14) + '</button>'
    + '<div><div style="font-size:20px;font-weight:700;letter-spacing:-0.4px">Schwierige Wörter</div><div style="font-size:12px;color:var(--muted)">' + hard.length + ' Wörter mit hoher Fehlerquote</div></div></div>';
  if(!hard.length){
    html += '<div class="t33-card"><div style="font-size:40px;margin-bottom:10px">🎯</div><div style="font-size:16px;font-weight:600;margin-bottom:6px">Noch keine Problemwörter</div><div style="color:var(--muted);font-size:13.5px">Übe ein paar Runden — Wörter mit Fehlerquote über 40% erscheinen hier automatisch.</div></div>';
  } else {
    html += '<button class="eta-set-btn primary" style="margin-bottom:14px" onclick="drillHardWords()">' + svg('train',16) + ' Diese Wörter gezielt üben</button>';
    html += '<div style="background:var(--card);border:1px solid var(--border);border-radius:14px;overflow:hidden">';
    hard.forEach((x, i) => {
      html += '<div style="padding:12px 14px;border-top:' + (i > 0 ? '1px solid var(--border)' : 'none') + ';display:flex;align-items:center;gap:12px">'
        + '<div style="flex:1;min-width:0"><div style="font-size:15px;font-weight:600;color:var(--text)">' + esc(x.w.word) + '</div><div style="font-size:12.5px;color:var(--text-soft);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(x.w.translation) + '</div></div>'
        + '<div style="text-align:right"><div style="font-size:14px;font-weight:700;color:var(--err)">' + Math.round(x.rate*100) + '%</div><div style="font-size:10px;color:var(--muted)">' + x.wrong + '× falsch</div></div></div>';
    });
    html += '</div>';
  }
  app.innerHTML = html;
}

function drillHardWords(){
  const hard = getHardWords().map(x => x.w);
  if(!hard.length) return;
  startTypeMode(hard, 'Schwierige Wörter');
}


/* ═══════════════════════════════════════════════
   ⚙️ EINSTELLUNGS-SHEET
   ═══════════════════════════════════════════════ */
function openSettings(){
  let sheet = document.getElementById('eta-settings-sheet');
  if(!sheet){
    sheet = document.createElement('div'); sheet.id = 'eta-settings-sheet';
    sheet.onclick = e => { if(e.target === sheet) closeSettings(); };
    document.body.appendChild(sheet);
  }
  const goal = (Stats.state && Stats.state.dailyGoal) || 20;
  const nl = getNewPerDay();
  const autoSp = getAutoSpeak();
  sheet.innerHTML = '<div class="eta-sheet-inner"><span class="eta-sheet-handle"></span><h3>Einstellungen</h3>'
    + '<div class="eta-set-section"><div class="eta-set-label">Tagesziel (Wörter pro Tag)</div><div class="eta-goal-opts">'
    + [10,20,30,50].map(g => '<button class="eta-goal-opt' + (g === goal ? ' active' : '') + '" onclick="setDailyGoalOpt(' + g + ')">' + g + '</button>').join('')
    + '</div></div>'
    + '<div class="eta-set-section"><div class="eta-set-label">Neue Wörter pro Tag (Dosierung)</div><div class="eta-goal-opts">'
    + [5,10,15,20].map(n => '<button class="eta-goal-opt' + (n === nl ? ' active' : '') + '" onclick="setNewPerDay(' + n + ')">' + n + '</button>').join('')
    + '</div></div>'
    + '<div class="eta-set-section"><div class="eta-set-label">Automatische Aussprache beim Aufdecken</div><div class="eta-goal-opts">'
    + '<button class="eta-goal-opt' + (autoSp ? ' active' : '') + '" onclick="setAutoSpeak(1)">🔊 An</button>'
    + '<button class="eta-goal-opt' + (!autoSp ? ' active' : '') + '" onclick="setAutoSpeak(0)">Aus</button>'
    + '</div></div>'
    + '<div class="eta-set-section"><div class="eta-set-label">Synchronisation</div><button class="eta-set-btn" onclick="closeSettings();openSyncModal()">' + svg('cloud',16) + ' Geräte-Sync einrichten</button></div>'
    + '<div class="eta-set-section"><div class="eta-set-label">Fortschritt</div><button class="eta-set-btn danger" onclick="resetProgress()">' + svg('x',16) + ' Lernfortschritt zurücksetzen</button></div>'
    + '<button class="eta-set-btn" onclick="closeSettings()">Schliessen</button></div>';
  sheet.classList.add('open');
}
function closeSettings(){ const s = document.getElementById('eta-settings-sheet'); if(s) s.classList.remove('open'); }
function setDailyGoalOpt(g){
  Stats.setDailyGoal(g);
  openSettings();
  if(mode === 'today') try { render(); } catch(e){}
}
function resetProgress(){
  if(!confirm('Wirklich den gesamten Lernfortschritt zurücksetzen? Das kann nicht rückgängig gemacht werden.')) return;
  SRS.resetAll();   // schreibt Tombstone in den Sync-Gist, damit auch andere Geräte leeren
  location.reload();
}

/* ═══════════════════════════════════════════════
   📈 FORTSCHRITTS-ANSICHT (Heatmap, Stufen, Genauigkeit)
   ═══════════════════════════════════════════════ */
function openProgressSheet(){
  let sh = document.getElementById('v4-progress');
  if(!sh){
    sh = document.createElement('div'); sh.id = 'v4-progress';
    sh.onclick = ev => { if(ev.target === sh) sh.classList.remove('open'); };
    document.body.appendChild(sh);
  }
  const st = Stats.state || {};
  const dp = st.dailyProgress || {};
  const goal = st.dailyGoal || 20;
  // Heatmap: letzte 12 Wochen (Spalten), Mo–So (Zeilen)
  let cells = '';
  const d = new Date();
  const offset = (d.getDay() + 6) % 7;                     // Tage seit Montag
  const start = new Date(d); start.setDate(d.getDate() - offset - 77); // 11 Wochen + aktuelle
  for(let row = 0; row < 7; row++){
    for(let col = 0; col < 12; col++){
      const cd = new Date(start); cd.setDate(start.getDate() + col*7 + row);
      const iso = cd.toISOString().slice(0,10);
      const n = dp[iso] || 0;
      const cls = n === 0 ? '' : n < goal*0.5 ? 'h1' : n < goal ? 'h2' : n < goal*2 ? 'h3' : 'h4';
      const future = cd > d;
      cells += '<i class="' + cls + '"' + (future ? ' style="opacity:.15"' : '') + ' title="' + iso + ': ' + n + '"></i>';
    }
  }
  // Stufen-Verteilung
  const lv = [0,0,0,0,0,0,0,0];
  try { WORDS.forEach(w => { const e = SRS.state[w.id]; const has = e && (((e.level||0) > 0) || ((e.ok||0)+(e.wrong||0)) > 0); lv[has ? Math.min(7, e.level||0) : 0]++; }); } catch(e){}
  const lvColors = ['#2E3956','#4A5578','#5965F0','#7C8CFF','#5EE3D6','#42E3A4','#2FBF87','#FBBF24'];
  const totalW = WORDS.length || 1;
  const bar = lv.map((n, i) => n ? '<i style="width:' + (100*n/totalW) + '%;background:' + lvColors[i] + '" title="Stufe ' + i + ': ' + n + '"></i>' : '').join('');
  const legend = lv.map((n, i) => n ? '<span><b style="color:' + lvColors[i] + '">●</b> S' + i + ': <b>' + n + '</b></span>' : '').join('');
  // Genauigkeit je Modus
  const modes = { train:'🧠 Training', quiz:'❓ Quiz', fill:'✏️ Lückentext', flash:'🃏 Karten', type:'⌨️ Tippen' };
  const agg = {};
  (st.sessions || []).forEach(s => { if(!s.total) return; if(!agg[s.mode]) agg[s.mode] = { c:0, t:0 }; agg[s.mode].c += s.correct||0; agg[s.mode].t += s.total; });
  const modeRows = Object.keys(agg).map(m => {
    const p = Math.round(100 * agg[m].c / agg[m].t);
    return '<div class="v4p-mode"><span class="n">' + (modes[m]||m) + '</span><span class="track"><i style="width:' + p + '%"></i></span><span class="pct">' + p + '%</span></div>';
  }).join('') || '<p style="font-size:12px;color:var(--muted)">Noch keine abgeschlossenen Runden.</p>';
  let trend = { curPct: null }; try { trend = Stats.accuracyTrend(); } catch(e){}
  const mast = lv[7];
  sh.innerHTML = '<div class="inner"><span class="eta-sheet-handle"></span>'
    + '<h3>📈 Dein Fortschritt</h3>'
    + '<div class="v4p-grid">'
    + '<div class="v4p-cell"><div class="v">🔥 ' + (st.streak||0) + '</div><div class="l">Streak (Rekord ' + (st.longestStreak||0) + ')</div></div>'
    + '<div class="v4p-cell"><div class="v">⭐ ' + (st.xp||0) + '</div><div class="l">XP</div></div>'
    + '<div class="v4p-cell"><div class="v" style="color:var(--ok)">' + mast + '</div><div class="l">Gemeistert</div></div>'
    + '<div class="v4p-cell"><div class="v">' + (trend.curPct === null ? '–' : trend.curPct + '%') + '</div><div class="l">Genauigkeit 7T</div></div>'
    + '</div>'
    + '<div class="v4p-label">Aktivität · letzte 12 Wochen</div><div class="v4p-heat">' + cells + '</div>'
    + '<div class="v4p-label">Wortschatz nach Lernstufe (' + totalW + ' Wörter)</div><div class="v4p-bar">' + bar + '</div><div class="v4p-legend">' + legend + '</div>'
    + '<div class="v4p-label">Genauigkeit je Modus</div>' + modeRows
    + '<button class="v4-close" onclick="document.getElementById(\'v4-progress\').classList.remove(\'open\')">Schliessen</button>'
    + '</div>';
  sh.classList.add('open');
}

/* ═══════════════════════════════════════════════
   ⬆️ LEVEL-UP-Animation (bei jedem Stufenaufstieg)
   ═══════════════════════════════════════════════ */
function showLevelUp(before, after){
  try {
    const el = document.createElement('div'); el.className = 'eta-levelup';
    el.innerHTML = svg('trending',16) + '<span class="lvl-from">Stufe ' + before + '</span>' + svg('chevronRight',12) + '<span class="lvl-to">' + after + '</span>';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  } catch(e){}
}

/* ═══════════════════════════════════════════════
   👋 ONBOARDING (nur beim allerersten Start)
   ═══════════════════════════════════════════════ */
function maybeOnboard(){
  try { if(localStorage.getItem('eta_onboarded') === '1') return; } catch(e){ return; }
  const slides = [
    { icon:'today', title:'Willkommen bei ETA', text:'Dein persönlicher Englisch-Vokabeltrainer. Kurze Runden, echte Fotos, beide Sprachrichtungen — und wissenschaftlich fundierte Wiederholung.' },
    { icon:'train', title:'Runden statt Berge', text:'Du lernst in 12er-Runden: erst fällige Wiederholungen, dann dosiert neue Wörter. Was du nicht wusstest, kommt in derselben Runde gleich noch einmal.' },
    { icon:'flame', title:'Bleib dran', text:'Tagesziel erreichen, Streak aufbauen — dein Fortschritt synchronisiert sich automatisch zwischen Handy und PC. Antippen des 🔥 zeigt deine Statistik.' },
  ];
  let obIdx = 0;
  const ob = document.createElement('div'); ob.id = 'eta-onboard';
  document.body.appendChild(ob);
  function paint(){
    const s = slides[obIdx];
    ob.innerHTML = '<div class="eta-ob-inner"><div class="eta-ob-icon">' + svg(s.icon,28) + '</div>'
      + '<div class="eta-ob-title">' + s.title + '</div><div class="eta-ob-text">' + s.text + '</div>'
      + '<div class="eta-ob-dots">' + slides.map((_, i) => '<div class="eta-ob-dot' + (i === obIdx ? ' active' : '') + '"></div>').join('') + '</div>'
      + '<button class="eta-ob-btn" onclick="obNext()">' + (obIdx < slides.length-1 ? 'Weiter' : 'Los geht\'s') + '</button>'
      + (obIdx < slides.length-1 ? '<button class="eta-ob-skip" onclick="obDone()">Überspringen</button>' : '')
      + '</div>';
  }
  window.obNext = function(){ if(obIdx < slides.length-1){ obIdx++; paint(); } else { window.obDone(); } };
  window.obDone = function(){ try { localStorage.setItem('eta_onboarded','1'); } catch(e){} ob.classList.remove('open'); setTimeout(() => ob.remove(), 200); };
  paint(); ob.classList.add('open');
}


(function(){
  const REPO = 'timlbclaude/Englishtrainer';   // Ziel-Repo für die ETA-Issues

  window.openAddWord = function(){
    if(!Sync || !Sync.isConfigured()){
      alert('Bitte zuerst den Sync-Token einrichten (Wolken-Badge oben rechts). Der gleiche Token wird auch fürs Anlegen der ETA-Issues verwendet — er braucht zusätzlich Issues-Schreibrechte auf dem Repo Englishtrainer.');
      if(typeof openSyncModal === 'function') openSyncModal();
      return;
    }
    document.getElementById('awWord').value = '';
    document.getElementById('awStatus').textContent = '';
    document.getElementById('awStatus').className = 'aw-status';
    document.getElementById('addWordModal').classList.add('open');
    setTimeout(()=>document.getElementById('awWord').focus(), 60);
  };

  window.closeAddWord = function(){
    document.getElementById('addWordModal').classList.remove('open');
  };

  window.submitAddWord = async function(){
    const word = (document.getElementById('awWord').value || '').trim();
    const cat  = document.getElementById('awCat').value || 'Allgemein';
    const status = document.getElementById('awStatus');
    const btn = document.getElementById('awSubmit');
    if(!word){ status.textContent = 'Bitte ein Wort eingeben.'; status.className = 'aw-status err'; return; }

    btn.disabled = true;
    status.textContent = 'Issue wird erstellt…'; status.className = 'aw-status';
    try{
      const title = 'ETA: ' + word + ' #' + cat;
      const res = await Sync.api('POST', '/repos/' + REPO + '/issues', {
        title: title,
        body:  'Automatisch erstellt aus der App (FAB).'
      });
      status.innerHTML = '✓ Issue #' + res.number + ' angelegt. Bot verarbeitet in ~30 s.';
      status.className = 'aw-status ok';
      document.getElementById('awWord').value = '';
      setTimeout(closeAddWord, 1800);
    } catch(e){
      status.textContent = 'Fehler: ' + (e.message || e);
      status.className = 'aw-status err';
    } finally {
      btn.disabled = false;
    }
  };

  // Enter im Wortfeld = Absenden
  document.getElementById('awWord').addEventListener('keydown', function(e){
    if(e.key === 'Enter'){ e.preventDefault(); submitAddWord(); }
  });
})();


/* ═══════════════════════════════════════════════
   🌙 THEME (Hell / Dunkel, Standard: Dunkel)
   ═══════════════════════════════════════════════ */
function applyTheme(theme){
  document.body.classList.toggle('dark', theme === 'dark');
  const btn = document.getElementById('v3Theme');
  if(btn) btn.innerHTML = svg(theme === 'dark' ? 'sun' : 'moon', 15);
  const tc = document.querySelector('meta[name="theme-color"]');
  if(tc) tc.setAttribute('content', theme === 'dark' ? '#0B0F17' : '#ffffff');
}
function toggleTheme(){
  const now = document.body.classList.contains('dark') ? 'light' : 'dark';
  try { localStorage.setItem('etTheme', now); } catch(e){}
  applyTheme(now);
}

/* ═══════════════════════════════════════════════
   🚀 START
   ═══════════════════════════════════════════════ */
/* Wort-Normalisierung: Kleinschreibung ausser Akronyme (Anzeige-Konvention) */
(function normalizeWords(){
  try {
    WORDS.forEach(w => {
      if(!w.word) return;
      const word = w.word;
      // "to Xxx" Verben: nur das Hauptwort kleinschreiben
      if(/^to [A-Z]/.test(word)){ w.word = 'to ' + word.charAt(3).toLowerCase() + word.slice(4); return; }
      // Akronyme (TV, CEO) komplett gross lassen
      if(word === word.toUpperCase()) return;
      const firstWord = word.split(' ')[0];
      if(/^[A-Z][a-z]+$/.test(firstWord)){
        w.word = word.charAt(0).toLowerCase() + word.slice(1);
      }
    });
  } catch(e){ console.warn('[Init] Normalisierung:', e); }
})();

/* Gespeicherte Lernrichtung wiederherstellen */
try {
  const savedDir = localStorage.getItem('etLearnDir');
  if(savedDir === 'de-en' || savedDir === 'en-de') learnDir = savedDir;
} catch(e){}

/* Theme anwenden (vor dem ersten Rendern) */
(function initTheme(){
  let saved = 'dark';
  try { saved = localStorage.getItem('etTheme') || 'dark'; } catch(e){}
  initTopbar();
  initNav();
  applyTheme(saved);
})();

/* Decks vorbereiten und ersten Screen zeichnen */
deck = shuffle(WORDS);
trainDeck = buildTrainDeck();
try { render(); } catch(e){ console.error('render() failed:', e); document.getElementById('app').innerHTML = '<p style="padding:20px;color:var(--err)">Fehler beim Laden: ' + (e && e.message || e) + ' — bitte Konsole (F12) prüfen.</p>'; }
try { prefetchImages(); } catch(e){ console.warn('prefetchImages failed:', e); }
try { Sync.init(); } catch(e){ console.warn('Sync.init failed:', e); }
setTimeout(() => { try { maybeOnboard(); } catch(e){} }, 600);

/* Service Worker registrieren (PWA / Offline-Support) */
if('serviceWorker' in navigator){
  window.addEventListener('load', function(){
    // Bei einem Update (neuer SW übernimmt) genau einmal neu laden,
    // damit neue Wörter/Änderungen sofort erscheinen – aber NICHT beim Erstbesuch.
    if(navigator.serviceWorker.controller){
      let reloaded = false;
      navigator.serviceWorker.addEventListener('controllerchange', function(){
        if(reloaded) return; reloaded = true;
        window.location.reload();
      });
    }
    navigator.serviceWorker.register('./sw.js')
      .then(function(reg){ console.log('SW registriert:', reg.scope); reg.update(); })
      .catch(function(err){ console.warn('SW Fehler:', err); });
  });
}
