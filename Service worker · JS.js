// 📌 Calice Service Worker — gestisce cache offline
const CACHE_NAME = 'calice-v1';
const URLS_DA_CACHARE = [
  '/Calice/',
  '/Calice/index.html',
  '/Calice/scansiona.html',
  '/Calice/cantine.html',
  '/Calice/top-vini-2025.html',
  '/Calice/abbinamenti.html',
  '/Calice/regioni.html',
  '/Calice/cantina.html',
  '/Calice/storia-del-vino.html',
  '/Calice/blog.html'
];

// Installazione — salva le pagine principali in cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Calice: cache installata');
      return cache.addAll(URLS_DA_CACHARE);
    })
  );
});

// Attivazione — rimuove cache vecchie
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

// Fetch — serve dalla cache se offline
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Aggiorna la cache con la risposta fresca
        const copia = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copia));
        return response;
      })
      .catch(() => {
        // Offline: serve dalla cache
        return caches.match(event.request);
      })
  );
});