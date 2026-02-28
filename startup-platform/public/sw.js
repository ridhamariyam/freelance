// Bump CACHE name whenever you deploy — forces old caches to clear
const CACHE = 'launchbase-v2';
const PRECACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icons/icon.svg',
];

// ─── Install: precache shell ──────────────────────────────────────────────
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// ─── Activate: clean old caches ───────────────────────────────────────────
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ─── Fetch ────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Navigation requests (HTML pages, SPA routes):
  //   Cache-first with background revalidation.
  //   Always falls back to /index.html so deep links and iOS "Add to Home Screen"
  //   work correctly without a server round-trip.
  if (request.mode === 'navigate') {
    e.respondWith(
      caches.match('/index.html').then((cached) => {
        // Revalidate index.html in the background
        const revalidate = fetch('/index.html')
          .then((res) => {
            if (res.ok) {
              caches.open(CACHE).then((c) => c.put('/index.html', res.clone()));
            }
            return res;
          })
          .catch(() => null);

        // Serve from cache immediately (critical for iOS offline)
        return cached || revalidate || caches.match('/offline.html');
      })
    );
    return;
  }

  // Static assets (JS, CSS, images, fonts):
  //   Cache-first. Fetch from network if not cached, then store.
  e.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        // Refresh in background
        fetch(request)
          .then((res) => {
            if (res.ok) {
              caches.open(CACHE).then((c) => c.put(request, res));
            }
          })
          .catch(() => {});
        return cached;
      }

      return fetch(request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(request, clone));
          }
          return res;
        })
        .catch(() => caches.match('/offline.html'));
    })
  );
});
