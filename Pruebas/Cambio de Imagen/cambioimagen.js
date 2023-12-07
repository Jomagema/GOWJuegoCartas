const imagenes = ["1.jpg", "2.jpg", "3.jpg"]; // Rutas de las imágenes
let indiceImagenActual = 0; // Índice de la imagen actual

function cambiarImagen(cambio) {
  indiceImagenActual += cambio;

  // Verificar límites para el índice
  if (indiceImagenActual < 0) {
    indiceImagenActual = imagenes.length - 1;
  } else if (indiceImagenActual >= imagenes.length) {
    indiceImagenActual = 0;
  }

  // Cambiar la imagen
  document.getElementById("imagen").src = imagenes[indiceImagenActual];
}