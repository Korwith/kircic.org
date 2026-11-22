/*
 *   Copyright (c) 2026 Thaddeus MW.
 *
 */

// Network-first service worker: every successful GET is stored so the
// site can still load from cache when the network is unavailable.
// Compiled separately (tsconfig.sw.json) to /sw.js so its scope is the whole site.

const worker = self as unknown as ServiceWorkerGlobalScope;

const CACHE_NAME: string = 'kircic-cache-v1';

// assets only requested on demand (css background images), stored up front
// so notifications still have their icons when shown offline
const PRECACHE: string[] = [
    '/icon/warning.svg',
    '/icon/info_blue.svg',
    '/icon/info.svg',
    '/icon/error.svg',
    '/icon/checkmark.svg'
];

// third party hosts the page depends on (styles, fonts, scripts, photo data)
const CACHED_HOSTS: string[] = [
    'cdnjs.cloudflare.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'snap.red'
];

// clients whose page was served from cache instead of the network
const offlineClients: Set<string> = new Set();

worker.addEventListener('install', (event: ExtendableEvent) => {
    worker.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache: Cache) => cache.addAll(PRECACHE)).catch(() => {})
    );
});

worker.addEventListener('activate', (event: ExtendableEvent) => {
    event.waitUntil((async () => {
        const keys: string[] = await caches.keys();
        await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
        await worker.clients.claim();
    })());
});

function shouldCache(request: Request): boolean {
    if (request.method !== 'GET') return false;
    const url: URL = new URL(request.url);
    if (!url.protocol.startsWith('http')) return false;
    return url.origin === worker.location.origin || CACHED_HOSTS.includes(url.hostname);
}

worker.addEventListener('fetch', (event: FetchEvent) => {
    const request: Request = event.request;
    if (!shouldCache(request)) return;

    event.respondWith((async () => {
        const cache: Cache = await caches.open(CACHE_NAME);
        try {
            const response: Response = await fetch(request);
            // opaque (no-cors) responses have status 0 but are still usable
            if (response.ok || response.type === 'opaque') {
                cache.put(request, response.clone()).catch(() => {});
            }
            return response;
        } catch (error) {
            const cached: Response | undefined = await cache.match(request, { ignoreSearch: request.mode === 'navigate' });
            if (!cached) throw error;
            if (request.mode === 'navigate' && event.resultingClientId) {
                offlineClients.add(event.resultingClientId);
            }
            return cached;
        }
    })());
});

// pages ask on load whether they were served from cache
worker.addEventListener('message', (event: ExtendableMessageEvent) => {
    if (event.data?.type !== 'offline-status' || !(event.source instanceof Client)) return;
    const id: string = event.source.id;
    event.source.postMessage({ type: 'offline-status', offline: offlineClients.has(id) });
    offlineClients.delete(id);
});
