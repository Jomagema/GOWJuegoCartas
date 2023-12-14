var imagenes = []; // Rutas de las imágenes
var indiceImagenActual = 0; // Índice de la imagen actual

const passwordInput = document.getElementById('contrasena');
const confirmPasswordInput = document.getElementById('confcontrasena');

passwordInput.addEventListener('change', () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden');
    } else {
      confirmPasswordInput.setCustomValidity('');
    }
  });

  confirmPasswordInput.addEventListener('change', () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden');
    } else {
      confirmPasswordInput.setCustomValidity('');
    }
  });

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
    document.getElementById("ruta_imagen").value = imagenes[indiceImagenActual];

}

fetch('php/obtener_imagenes.php')
    .then(response => response.json())
    .then(imagenesBase64 => {
    
    // Recorrer el array de imágenes en base64
    imagenesBase64.forEach(imagenBase64 => {
        // Crear un elemento img
        imagenes.push('data:image/png;base64,' + imagenBase64); // Ajusta el tipo de imagen si es diferente a PNG

    });
})
    .catch(error => {
    console.error('Error al obtener las imágenes:', error);
});
