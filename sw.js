"use strict";
/*
 *   Copyright (c) 2026 Thaddeus MW.
 *
 */
// Network-first service worker: every successful GET is stored so the
// site can still load from cache when the network is unavailable.
// Lives at the site root so its compiled /sw.js controls every page.
// Worker-only types are declared in code/worker/service_worker.d.ts.
const worker = self;
const CACHE_NAME = 'kircic-cache-v1';
// assets only requested on demand (css background images), stored up front
// so notifications still have their icons when shown offline
const PRECACHE = [
    '/icon/warning.svg',
    '/icon/info_blue.svg',
    '/icon/info.svg',
    '/icon/error.svg',
    '/icon/checkmark.svg'
];
// third party hosts the page depends on (styles, fonts, scripts, photo data)
const CACHED_HOSTS = [
    'cdnjs.cloudflare.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'snap.red'
];
// clients whose page was served from cache instead of the network
const offlineClients = new Set();
worker.addEventListener('install', (event) => {
    worker.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).catch(() => { }));
});
worker.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
        await worker.clients.claim();
    })());
});
function shouldCache(request) {
    if (request.method !== 'GET')
        return false;
    const url = new URL(request.url);
    if (!url.protocol.startsWith('http'))
        return false;
    return url.origin === worker.location.origin || CACHED_HOSTS.includes(url.hostname);
}
worker.addEventListener('fetch', (event) => {
    const request = event.request;
    if (!shouldCache(request))
        return;
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        try {
            const response = await fetch(request);
            // opaque (no-cors) responses have status 0 but are still usable
            if (response.ok || response.type === 'opaque') {
                cache.put(request, response.clone()).catch(() => { });
            }
            return response;
        }
        catch (error) {
            const cached = await cache.match(request, { ignoreSearch: request.mode === 'navigate' });
            if (!cached)
                throw error;
            if (request.mode === 'navigate' && event.resultingClientId) {
                offlineClients.add(event.resultingClientId);
            }
            return cached;
        }
    })());
});
// pages ask on load whether they were served from cache
worker.addEventListener('message', (event) => {
    if (event.data?.type !== 'offline-status' || !event.source || !('id' in event.source))
        return;
    const id = event.source.id;
    event.source.postMessage({ type: 'offline-status', offline: offlineClients.has(id) });
    offlineClients.delete(id);
});
