/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;


const cacheNetWorkFirst = [
  '/api/auth/renew',
  '/api/events'
]

registerRoute(
  ({ url }) => {
    if( cacheNetWorkFirst.includes( url.pathname ) ) return true;

    return false;
  },
  new NetworkFirst()
);

const cacheFirstNetwork = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js',
  'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700;900&display=swap'
]

registerRoute(
  ({ url }) => {
    if( cacheFirstNetwork.includes( url.href ) ) return true;

    return false;
  },
  new CacheFirst()
);

//POSTEOS OFFLINE

const bySyncPlugin =  new BackgroundSyncPlugin('posteos-offline', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});


registerRoute(
  new RegExp('http://localhost:4000/api/events/new'),
  new NetworkOnly({
    plugins: [ bySyncPlugin ],
  }),
  'POST'
);

registerRoute(
  new RegExp('http://localhost:4000/api/events/'),
  new NetworkOnly({
    plugins: [ bySyncPlugin ],
  }),
  'DELETE'
);

registerRoute(
  new RegExp('http://localhost:4000/api/events/'),
  new NetworkOnly({
    plugins: [ bySyncPlugin ],
  }),
  'PUT'
);