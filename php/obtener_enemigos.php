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
$sql = "SELECT nombre, vida, ataque, nivel, imagen FROM enemigos ORDER BY nivel ASC"; // Cambia tabla_imagenes y el criterio de búsqueda según tu estructura
$result = $conn->query($sql);

$enemigos = array(); // Array para almacenar las imágenes en base64

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $enemigo = array(
            'nombre' => $row['nombre'],
            'vida' => $row['vida'],
            'ataque' => $row['ataque'],
            'nivel' => $row['nivel'],
            'imagen' => base64_encode($row['imagen'])
        );

        // Agregar el enemigo al array principal
        $enemigos[] = $enemigo;
    }
    // Convertir a JSON
    header('Content-Type: application/json');
    $json_data = json_encode($enemigos);
    echo $json_data;
} else {
    echo "0 resultados";
}

// Cerrar conexión
$conn->close();
?>