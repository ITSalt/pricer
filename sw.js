self.addEventListener('install', function (event) {
  console.log('[ServiceWorker] Install');

  event.waitUntil((async () => {
    const cache = await caches.open("pricerStore");
    // Setting {cache: 'reload'} in the new request will ensure that the response
    // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    await cache.addAll([
      new Request("index.html", { cache: 'reload' }),
      new Request("main.js", { cache: 'reload' }),
      new Request("main.css", { cache: 'reload' })
    ]);
  })());

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});


/*self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/main.js',
      '/main.css'
    ])),
  );
});*/

self.addEventListener('fetch', (e) => {
  console.log("fetch", e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});