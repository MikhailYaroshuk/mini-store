self.addEventListener('fetch', event => {
  if (event.request.url.startsWith('https://fakestoreapi.com/')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then(networkResponse => {
          return caches.open('product-api-cache-v1').then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
      })
    );
  }
});