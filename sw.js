const version = 5;
const nombreCache = 'pvsg-cache-' + version;

const recursosEstaticos = [
    '/',
    '/index.html',
    '/offline.html',
    '/icons/favicon.ico',
    '/css/estilos.css',
    '/img/unconnected.svg',
    '/img/dog.svg',
    '/img/cat.svg',
    '/js/script.js',
    '/manifest.json',
    '/icons/apple-touch-icon.png',
    '/icons/android-chrome-192x192.png',
    '/icons/favicon-32x32.png',
    'https://fonts.googleapis.com/css?family=Roboto&display=swap'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(nombreCache).then(cache => cache.addAll(recursosEstaticos))
    )
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(nombresCaches => {
            return Promise.all(
                nombresCaches.filter(cache => cache !== nombreCache).map(cache => caches.delete(cache))
            )
        })
    )
})

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') {
        return;
    }

    const url = new URL(e.request.url);
    let urlBuscar = url.origin !== location.origin ? e.request.url : url.pathname;
    if (recursosEstaticos.includes(urlBuscar)) {
        e.respondWith(
            caches.open(nombreCache).then(cache => cache.match(e.request))
        )
    }
});