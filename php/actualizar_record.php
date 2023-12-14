<?php
// Conexión a la base de datos (reemplaza con tus propios datos)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gow";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener el usuario y el nuevo valor de récord enviados desde JavaScript
$usuario = $_POST['usuario'] ?? '';
$nuevoRecord = $_POST['nuevoRecord'] ?? '';

// Consulta SQL para actualizar el récord del usuario
$sql = "UPDATE usuarios SET record = $nuevoRecord WHERE usuario = '$usuario'";

if ($conn->query($sql) === TRUE) {
    echo "Record actualizado correctamente";
} else {
    echo "Error al actualizar el record: " . $conn->error;
}

$conn->close();
?>
