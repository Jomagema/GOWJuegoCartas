// JavaScript para agregar la clase 'show-image' después de que la página ha cargado
document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('show-image');
});

// Funciones para manejar el evento de hacer clic en el panel y mostrar la descripción en una ventana modal
function showDescription(title, description, imagePath) {
    var modal = document.getElementById('description-modal');
    var modalTitle = document.getElementById('modal-title');
    var modalImage = document.getElementById('modal-image');
    var modalDescription = document.getElementById('modal-description');
    var closeButton = document.querySelector('.close');

    modalTitle.textContent = title;
    modalImage.src = imagePath;
    modalDescription.textContent = description;
    modal.style.display = 'block';

    // Agregamos un event listener al botón de cerrar
    closeButton.addEventListener('click', function() {
        closeDescriptionModal();
    });

    // Agregamos un event listener para cerrar la ventana modal al hacer clic fuera de ella
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeDescriptionModal();
        }
    });
}

// Función para cerrar la ventana modal
function closeDescriptionModal() {
    var modal = document.getElementById('description-modal');
    modal.style.display = 'none';
}

var user = obtenerValorCookie("usuario");
console.log(user);

if (user != null) {
    fetch(`php/obtener_usuario.php?usuario=${user}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("boton").innerHTML = "<p>Bienvenido "+user+" | Record: "+data.record+"</p>";
        data.avatar = "data:image/png;base64," +data.avatar;
        document.getElementById("boton").innerHTML +="<img src='"+data.avatar+"'><br>";
        document.getElementById("boton").innerHTML +="<p onclick='cerrarSesion()'>Cerrar sesion</p>"
    })
    .catch(error => console.error('Error:', error));
}

function generarBotones() {
    let botones = document.getElementById("boton")
    botones.innerHTML = "<a href='login.html'><button>Iniciar Sesión</button></a><a href='registro.html'><button>Registrarse</button></a>"
}

function obtenerValorCookie(nombreCookie) {
    var nombre = nombreCookie + "=";
    var cookies = document.cookie.split(';');
  
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
  
      // Verificar si la cookie comienza con el nombre proporcionado
      if (cookie.indexOf(nombre) === 0) {
        // Extraer y devolver el valor de la cookie
        return cookie.substring(nombre.length, cookie.length);
      }
    }
  
    // Si no se encontró la cookie, devuelve null o un valor por defecto
    return null;
}

function cerrarSesion(nombre) {
    document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    generarBotones();
}
