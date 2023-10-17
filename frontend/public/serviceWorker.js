let CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
'/',
'/index.html',
];
self.addEventListener('install', function(event) {
// Perform install steps

    event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
    })
    );

    self.skipWaiting();
});

self.addEventListener('notificationclick', event => {
    event.waitUntil(self.clients.matchAll().then(clients => {
      if (clients.length){ // check if at least one tab is already open
        clients[0].focus();
      } else {
        self.clients.openWindow('/');
      }
    }));
  });

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request)
    .then(function(response) {
    if (response) {
    return response;
    }
    return fetch(event.request);
    })
);
});

self.addEventListener('push', function (event) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
      return;
  }
  

  var data = {};
  if (event.data) {
      data = event.data.text();
  }
    
  if(data.endsWith('deploy')){
    console.log("Got deploy request - resetting serviceWorker");
     //unregister the serviceWorker
     self.registration.unregister();
     
     return;  

  }

  console.log('Notification Received:');
  console.log(data);

  var title = "eMote";
  var message = data;
  var icon = "icon_azul.jpg";
  
  event.waitUntil(self.registration.showNotification(title, {
      body: message,
      icon: icon,
      badge: icon,
      vibrate :  [200, 100, 200, 100, 200, 100, 200],
      tag: "eMote",
      renotify: true,
  }));
});
