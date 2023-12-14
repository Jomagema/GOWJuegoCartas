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

$parametro = $_GET['parametro'];

// Consulta para obtener todas las imágenes
$sql = "SELECT valor, tipo, cantidad, imagen FROM cartas WHERE id_personaje='$parametro'"; // Cambia tabla_imagenes y el criterio de búsqueda según tu estructura
$result = $conn->query($sql);

$cartas = array(); // Array para almacenar las imágenes en base64

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $carta = array(
            'valor' => $row['valor'],
            'tipo' => $row['tipo'],
            'cantidad' => $row['cantidad'],
            'imagen' => base64_encode($row['imagen'])
        );

        // Agregar el enemigo al array principal
        $cartas[] = $carta;
    }
    // Convertir a JSON
    header('Content-Type: application/json');
    $json_data = json_encode($cartas);
    echo $json_data;
} else {
    echo "0 resultados";
}

// Cerrar conexión
$conn->close();
?>