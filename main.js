const pantalla = document.getElementById('pantalla-carga');
const video = document.querySelector('video');

function ocultarPantalla() {
  pantalla.classList.add('oculta');            // se desvanece
  setTimeout(() => pantalla.remove(), 1000);    // se elimina al terminar
}

// Esperamos a que cargue la página...
const esperas = [
  new Promise((ok) => window.addEventListener('load', ok)),
];

// ...y a que el video pueda reproducirse
if (video && video.readyState < 3) {
  esperas.push(new Promise((ok) => video.addEventListener('canplay', ok, { once: true })));
}

Promise.all(esperas).then(ocultarPantalla);

// Seguridad: si algo falla, igual se oculta a los 8 segundos
setTimeout(ocultarPantalla, 8000);