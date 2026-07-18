// 家計簿の入力データは扱わず、画面を開くたびに最新版を取得する。
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith(fetch(new Request(event.request, { cache: 'reload' })));
});
