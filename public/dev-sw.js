self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients
      .claim()
      .then(() => caches.keys())
      .then((cacheNames) => Promise.all(cacheNames.map((name) => caches.delete(name))))
      .then(() => self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
      .then((clients) =>
        self.registration.unregister().then(() => {
          clients.forEach((client) => {
            if ('navigate' in client) {
              client.navigate(client.url);
            }
          });
        })
      )
  );
});
