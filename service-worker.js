const CACHE_NAME = "v1"; // Nombre de la caché
const urlsToCache = [
  "/", // Página principal
  "/index.html", // HTML de la aplicación
  "/estilos.css", // CSS de la aplicación
  "/appNotas.js", // JavaScript de la aplicación
  "icon-192x192.png", // Icono
  "icon-512x512.png", // Icono
];

// Evento de instalación del service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME) // Abrir la caché
      .then((cache) => {
        console.log("Archivos en caché");
        return cache.addAll(urlsToCache); // Añadir todos los archivos a la caché
      })
  );
});

// Evento de activación del service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]; // Lista de cachés a conservar
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Eliminar cachés antiguas
          }
        })
      );
    })
  );
});

// Evento para manejar las solicitudes de red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request) // Intentar encontrar la respuesta en la caché

      .then((response) => {
        if (response) {
          return response; // Devolver la respuesta de la caché si existe;
        }
        return fetch(event.request); // Si no, hacer la solicitud de red;
      })
  );
});
