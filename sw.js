const CACHE = 'myday-v2';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

self.addEventListener('push', e => {
  let data = {};
  try {
    data = e.data ? e.data.json() : {};
  } catch {
    data = { title: 'Мій день', body: e.data ? e.data.text() : 'Нове повідомлення' };
  }
  e.waitUntil(
    self.registration.showNotification(data.title || 'Мій день', {
      body: data.body || 'Нове повідомлення',
      icon: './icons/icon-192.png',
      badge: './icons/icon-192.png',
      tag: data.tag || 'default',
      data: { url: './' }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cls => {
      if (cls.length > 0) {
        cls[0].focus();
      } else {
        clients.openWindow(e.notification.data?.url || './');
      }
    })
  );
});
