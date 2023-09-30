import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";

import { clientsClaim } from "workbox-core";

import { NavigationRoute, registerRoute } from "workbox-routing";

cleanupOutdatedCaches();
clientsClaim();

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), {
    denylist: [/^\/backoffice/],
  })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener("install", async () => {
  const cacheResources = await caches.open("resources-v1");
  const cacheImages = await caches.open("images-v1");

  await cacheResources.addAll([
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js'
  ]);

  await cacheImages.addAll([
    '/favicon.png'
  ])
});

const apiOfflineFallbacks = [
  'http://localhost:4000/api/auth/renew',
  'http://localhost:4000/api/events'
]

self.addEventListener( 'fetch', ( event ) => {

  // if ( event.request.url !== 'http://localhost:4000/api/auth/renew' ) return;
  if ( !apiOfflineFallbacks.includes( event.request.url ) ) return;

  const resp = fetch( event.request )
      .then( response => {

        if ( !response ) {
          return caches.match( event.request )
        }
        
        // Guardar en caché la respuesta
        caches.open('cache-dynamic').then( cache => {
          cache.put( event.request, response )
        })

        
        return response.clone();
      })
      .catch( () => {
        console.log('offline response');
        return caches.match( event.request )
      })


    event.respondWith( resp );

});