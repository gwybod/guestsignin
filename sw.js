this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/style.css',
        '/visitor.js',
        '/script.js',
        '/bits/',
        '/bits/dologin.bit',
        '/bits/dologout.bit',
        '/bits/main.bit',
        '/bits/signin.bit',
        '/bits/signout.bit',
        '/bits/terms.bit',
        '/assets/background.jpg'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== 'v';
        }).map(function(cacheName) {
          console.log('Deleting '+ cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })  
  );  
});
