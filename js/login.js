document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se envíe el formulario por defecto
  
    // Obtener datos del formulario
    var formData = new FormData(this);
  
    // Enviar petición al servidor PHP usando fetch
    fetch('php/login.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Mostrar mensaje de respuesta del servidor
      if(data.message == "1"){
        var user = formData.get('usuario');
        setCookie("usuario", user, 1);
        window.location.href = 'index.html';
      } else if(data.message == "0"){
        alert("Datos incorrectos");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  function setCookie(nombre, valor, expiracionDias) {
    var fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (expiracionDias * 24 * 60 * 60 * 1000));
    var expira = "expires=" + fechaExpiracion.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expira + ";path=/";
  }