/* English Trainer – Service Worker
   Strategie: Cache-First für index.html (Offline-Support),
   Network-First für alle anderen Requests.
*/

const CACHE = 'et-v10-iter2-fix2';
const OFFLINE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install: Kern-Dateien in den Cache laden
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

// Activate: Alte Caches löschen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: Netzwerk zuerst, bei Fehler aus Cache
self.addEventListener('fetch', event => {
  // Nur GET-Requests cachen
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Externe Ressourcen (Google Fonts, Wikimedia, Wikipedia API) NICHT intercepten —
  // der Browser holt sie direkt und behält dabei den <img referrerpolicy="no-referrer">.
  // Würden wir hier fetch(event.request) machen, ginge die Referrer-Policy verloren
  // und Wikimedia liefert 403 für Hotlinking aus.
  if (url.origin !== self.location.origin) {
    return; // → Browser handhabt die Anfrage selbst
  }

  // Eigene Dateien: Netzwerk-First, Cache als Fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Erfolgreiche Antwort → auch in Cache schreiben
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then(r => r || caches.match('./index.html')))
  );
});
