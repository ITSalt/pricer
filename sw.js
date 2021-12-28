self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/main.js',
      '/main.css'
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log("fetch", e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});