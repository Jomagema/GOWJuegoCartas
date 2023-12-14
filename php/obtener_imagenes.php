<?php
// Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gow";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta para obtener todas las imágenes
$sql = "SELECT imagen FROM avatares"; // Cambia tabla_imagenes y el criterio de búsqueda según tu estructura
$result = $conn->query($sql);

$imagenes = array(); // Array para almacenar las imágenes en base64

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $imagenData = $row['imagen'];
        $imagenBase64 = base64_encode($imagenData);
        $imagenes[] = $imagenBase64; // Agregar cada imagen en base64 al array
    }

    // Devolver el array de imágenes en base64 como JSON
    header('Content-Type: application/json');
    echo json_encode($imagenes);
} else {
    echo "No se encontraron imágenes.";
}

// Cerrar conexión
$conn->close();
?>