// src/service-worker.ts
self.addEventListener("install", (_) => {
  console.log("Service Worker installing.");
  // event.waitUntil(
  //   caches.open("my-cache").then((cache) => {
  //     return cache.addAll(["/", "/index.html", "/styles.css", "/main.js"]);
  //   })
  // );
});

self.addEventListener("activate", (_) => {
  console.log("Service Worker activating.");
  // event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (_) => {
  // event.respondWith(
  //   caches.match(event.request).then((response) => {
  //     return response || fetch(event.request);
  //   })
  // );
});
