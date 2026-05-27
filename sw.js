/* English Trainer – Service Worker
   Strategie: Cache-First für index.html (Offline-Support),
   Network-First für alle anderen Requests.
*/

const CACHE = 'et-v1';
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

  // Externe Ressourcen (Google Fonts, Wikimedia) nur aus Netzwerk
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(event.request).catch(() => new Response('', { status: 503 })));
    return;
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
      .catch(() => caches.match(event.request).then(r => r || new Response('Offline', { status: 503 })))
  );
});
