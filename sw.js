const CACHE_NAME = 'trendingdays-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/assets/logo.png',
    '/assets/favicon.ico',
    '/assets/favicon-96x96.png',
    '/assets/apple-touch-icon.png',
    '/assets/site.webmanifest'
];

// Install Service Worker and Cache Core Assets
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Network First, Falling Back to Cache for Tool Pages
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => {
            return caches.match(e.request);
        })
    );
});