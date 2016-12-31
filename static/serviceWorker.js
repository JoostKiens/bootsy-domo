'use strict';

const cacheVersion = 5
const currentCache = {
  offline: 'offline-cache' + cacheVersion
}
const offlineUrl = '/offline'

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
          '/app.js',
          offlineUrl
      ])
    })
  )
})

this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      // Return the offline page
      fetch(event.request.url).catch(error => caches.match(offlineUrl))
    )
  } else {
    // Respond with everything else if we can
    event.respondWith(caches.match(event.request)
      .then(response => response || fetch(event.request))
    )
  }
})
