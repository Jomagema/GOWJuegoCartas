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

// Obtener datos del formulario
$username = $_POST['usuario'];
$password = $_POST['contrasena'];

// Consulta para verificar las credenciales
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  // Usuario y contraseña coinciden, inicio de sesión exitoso
  $response = array('message' => '1');
} else {
  // Usuario o contraseña incorrectos
  $response = array('message' => '0');
}

// Devolver respuesta al cliente en formato JSON
header('Content-Type: application/json');
echo json_encode($response);

// Cerrar la conexión a la base de datos
$stmt->close();
$conn->close();
?>
