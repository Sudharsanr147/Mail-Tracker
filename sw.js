// Work Deliverables Tracker - Service Worker
// Works with GitHub Pages subdirectory deployment (/Mail-Tracker/)

const CACHE_NAME = ‘wdt-cache-v2’;

self.addEventListener(‘install’, event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => {
return cache.addAll([
self.registration.scope,
self.registration.scope + ‘index.html’
]).catch(() => {});
})
);
self.skipWaiting();
});

self.addEventListener(‘activate’, event => {
event.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
)
);
return self.clients.claim();
});

self.addEventListener(‘fetch’, event => {
if (event.request.mode === ‘navigate’) {
event.respondWith(
fetch(event.request).catch(() =>
caches.match(self.registration.scope + ‘index.html’)
)
);
}
});
