/* App-Smoke-Test: laeuft in GitHub Actions vor/nach jedem index.html-Commit.
   Prueft die Kern-UX im Handy-Format (412x892) mit echtem Chromium:
   Layout aller Modi, beide Lernrichtungen, Bild-System, v4-Lernmechanik
   (Dosierung, Fehler-Wiedervorlage, Runden). Exit-Code != 0 => Workflow rot.  */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

(async () => {
  const root = process.cwd();
  const srv = http.createServer((req, res) => {
    let p = req.url.split('?')[0]; if (p === '/') p = '/index.html';
    const f = path.join(root, decodeURIComponent(p));
    if (fs.existsSync(f) && fs.statSync(f).isFile()){ res.setHeader('Content-Type', 'text/html'); res.end(fs.readFileSync(f)); }
    else { res.writeHead(404); res.end(); }
  }).listen(8799);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 412, height: 892 }, isMobile: true, hasTouch: true });
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
  await page.route(/upload\.wikimedia\.org/, r => r.fulfill({ status: 200, contentType: 'image/png', body: png }));
  await page.route(/rest_v1|fonts\./, r => r.abort());
  await page.addInitScript(() => { localStorage.setItem('eta_onboarded', '1'); });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://localhost:8799/', { waitUntil: 'load' });
  await page.waitForTimeout(1500);

  const fails = [];
  const check = (name, cond) => { console.log((cond ? 'OK  ' : 'FAIL') + ' ' + name); if (!cond) fails.push(name); };

  // Datenmodell
  const data = await page.evaluate(() => ({
    words: WORDS.length,
    imgUrls: Object.keys(IMG_URLS).length,
    titles: Object.keys(WIKI_TITLES).length,
  }));
  check('WORDS vorhanden (' + data.words + ')', data.words >= 250);
  check('IMG_URLS-Deckung >= 90% der WIKI_TITLES', data.imgUrls >= data.titles * 0.9);

  // Heute: eine Bildschirmseite, v4-Zahlen
  const today = await page.evaluate(() => ({
    v3: !!document.querySelector('.v3t'),
    h: document.body.scrollHeight,
    counts: (document.querySelector('.v3t-counts') || {}).textContent || ''
  }));
  check('Heute passt auf eine Bildschirmseite', today.v3 && today.h <= 892);
  check('Heute zeigt dosierte neue Woerter', /neu/.test(today.counts));

  // Training: Runden-Deck <= 12, Karte sofort, Fehler-Wiedervorlage
  await page.evaluate(() => setMode('train'));
  await page.waitForTimeout(500);
  const train = await page.evaluate(() => ({
    deck: trainDeck.length,
    top: Math.round(document.getElementById('trainFc').getBoundingClientRect().top),
  }));
  check('Trainings-Runde begrenzt (Deck ' + train.deck + ' <= 12)', train.deck > 0 && train.deck <= 12);
  check('Trainingskarte sofort sichtbar (top ' + train.top + 'px)', train.top < 160);
  const requeue = await page.evaluate(() => {
    const id = trainDeck[trainIdx].id;
    const before = trainDeck.length;
    flipTrain(); rateTrain(false);
    return { grown: trainDeck.length === before + 1, wieder: trainDeck.slice(trainIdx).some(w => w.id === id) };
  });
  check('Fehler-Wiedervorlage: falsche Karte kommt erneut', requeue.grown && requeue.wieder);

  // Richtungswechsel beidseitig
  const dirs = await page.evaluate(async () => {
    const a = learnDir; window.__v3ToggleDir(); await new Promise(r => setTimeout(r, 200));
    const b = learnDir; window.__v3ToggleDir(); await new Promise(r => setTimeout(r, 200));
    return [a, b, learnDir].join('>');
  });
  check('Richtungswechsel beidseitig (' + dirs + ')', dirs === 'en-de>de-en>en-de');

  // Quiz: 4 Antworten ohne Scrollen + Hoer-Modus
  await page.evaluate(() => setMode('quiz'));
  await page.waitForTimeout(500);
  const quiz = await page.evaluate(() => {
    const cs = [...document.querySelectorAll('.choice')];
    const nav = document.querySelector('nav').getBoundingClientRect();
    return { n: cs.length, fits: cs.length ? cs[cs.length - 1].getBoundingClientRect().bottom <= nav.top : false };
  });
  check('Quiz: 4 Antworten ohne Scrollen', quiz.n === 4 && quiz.fits);
  const listen = await page.evaluate(async () => {
    window.__v32ToggleListen(); await new Promise(r => setTimeout(r, 300));
    const big = !!document.querySelector('.v32-listen-big');
    const wordHidden = !document.querySelector('.v32-word');
    window.__v32ToggleListen();
    return big && wordHidden;
  });
  check('Quiz-Hoermodus blendet Wort aus, zeigt Lautsprecher', listen);

  // Tippmodus + Wortliste + Fortschritts-Sheet
  await page.evaluate(() => setMode('type'));
  await page.waitForTimeout(500);
  check('Tippmodus laeuft (bilinguale Engine)', await page.evaluate(() => !!document.querySelector('.t33-card')));
  await page.evaluate(() => setMode('list'));
  await page.waitForTimeout(500);
  check('Wortliste: Sticky-Suche + Gruppen', await page.evaluate(() => !!document.querySelector('.v31-sticky') && document.querySelectorAll('.v31-group-head').length > 0));
  const prog = await page.evaluate(() => { openStreakSheet(); const s = document.getElementById('v4-progress'); return s && s.classList.contains('open') && s.querySelectorAll('.v4p-heat i').length === 84; });
  check('Fortschritts-Ansicht (Heatmap 84 Zellen)', prog);

  check('Keine JavaScript-Fehler', errors.length === 0);
  if (errors.length) console.log('JS-Fehler:', errors.slice(0, 5));

  await browser.close();
  srv.close();
  if (fails.length){ console.error('\n' + fails.length + ' Pruefung(en) fehlgeschlagen.'); process.exit(1); }
  console.log('\nAlle Pruefungen bestanden.');
})().catch(e => { console.error(e); process.exit(1); });
