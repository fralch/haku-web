;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_credisys',
  urlsToCache = [
    './',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
    'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
    'css/index/styles.css',
    'images/index/portada.png',
    'images/index/icono_1024.png',
    'images/asistencia/contenido_temperatura.svg',
    'images/asistencia/fondo_temperatura.png',
    'images/asistencia/fondo-validacion.png',
    'images/asistencia/fondo-validacion.svg',
    'images/asistencia/fondo.png',
    'images/asistencia/fondo.svg',
    'images/asistencia/pipet.svg',
    'images/asistencia/ubicacion.svg',
    'images/error-img/astronaut.svg',
    'images/error-img/earth.svg',
    'images/error-img/imagenerror.svg',
    'images/error-img/logoBlanco.svg',
    'images/error-img/moon.svg',
    'images/error-img/overlay_stars.svg',
    'images/error-img/rocket.svg',
    'images/general/foto-usuario.png',
    'images/general/foto-usuario.svg',
    'images/general/logo-azul-blanco-1.svg',
    'images/general/logo-azul-blanco-2.svg',
    'images/general/logo-azul-verde.svg',
    'images/general/logo-blanco-verde-1.svg',
    'images/general/logo-blanco.png',
    'images/general/logo-blanco.svg',
    'images/general/logo-corto-azul.svg',
    'images/general/logo-corto-blanco.png',
    'images/general/logo-corto-blanco.svg',
    'images/general/logo-corto-verde.svg',
    'images/general/logo-plomo.svg',
    'images/home/portada-sistema.svg',
    'images/login/passwordIcon.svg',
    'images/login/userIcon.svg'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})