/*
 * Self-destroying service worker.
 *
 * The previous Create React App site registered a service worker at this path
 * that aggressively precached its bundle. After migrating to Vite, that stale
 * worker keeps serving deleted assets to returning visitors and blanks the page.
 *
 * Browsers always revalidate the SW script, so they pick this up, activate it,
 * and it unregisters itself + clears all caches + reloads open tabs onto the
 * fresh site. Once gone, no SW is registered by the new app.
 */
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys()
        await Promise.all(keys.map((key) => caches.delete(key)))
      } catch (err) {
        /* ignore */
      }
      await self.registration.unregister()
      const clients = await self.clients.matchAll({ type: 'window' })
      clients.forEach((client) => client.navigate(client.url))
    })(),
  )
})
