const channel = new BroadcastChannel('sw-channel');

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      cache.addAll([
        '/public/',
        '/public/css/main.css',
        '/public/js/listener.js',
        '/public/app.js',
        '/public/index.html'
      ])
    })
  )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
  )
});

self.addEventListener('push', function(event) {
  channel.postMessage({status: 'push'});
});
