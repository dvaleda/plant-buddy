const CACHE_NAME = 'plant-buddy'

self.addEventListener('install', event => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.status === 200) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => 
            cache.put(event.request, clone)
          )
        }
        return response
      })
      .catch(() => caches.match(event.request))
  )
})

self.addEventListener('sync', event => {
  if (event.tag === 'sync-plants') {
    event.waitUntil(
      self.registration.showNotification('Plant Buddy', {
        body: 'Biljke su ažurirane! 🌱'
      })
    )
  }
})

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {}
  event.waitUntil(
    self.registration.showNotification(data.title || 'Plant Buddy', {
      body: data.body || 'Nova obavijest'
    })
  )
})
