<?php
// Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gow";

// Conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir datos del formulario
    $username = $_POST['usuario'];
    $email = $_POST['email'];
    $password = $_POST['contrasena'];
    $selectedImage = $_POST['ruta_imagen'];

    // Consulta para verificar si el usuario o email ya existen
    $checkQuery = "SELECT * FROM usuarios WHERE usuario='$username' OR email='$email'";
    $result = $conn->query($checkQuery);

    if ($result->num_rows > 0) {
        // Usuario o email ya existen, mostrar mensaje con JavaScript
        echo "<script>alert('El usuario o correo electrónico ya están registrados.'); window.location.href='../registro.html';</script>";
    } else {
        // Consulta de inserción
        $sql = "INSERT INTO usuarios (usuario, email, contraseña, avatar) VALUES ('$username', '$email', '$password', '$selectedImage')";

        if ($conn->query($sql) === TRUE) {
            header('Location: ../login.html');
        } else {
            echo "Error al registrar usuario: " . $conn->error;
        }
    }
}

$conn->close();
?>
