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

// Obtener el usuario enviado desde JavaScript
$usuario = $_GET['usuario'] ?? '';

if ($usuario !== '') {
    // Consulta SQL para obtener el récord y la ruta de la imagen del usuario
    $sql = "SELECT record, avatar FROM usuarios WHERE usuario = '$usuario'";
    
    $resultado = $conn->query($sql);
    
    if ($resultado->num_rows > 0) {
        // Obtener el resultado como un array asociativo
        $fila = $resultado->fetch_assoc();
        $record = $fila['record'];
        $rutaImagen = base64_encode($fila['avatar']);
        
        // Crear un array con la información
        $informacionUsuario = array(
            "record" => $record,
            "avatar" => $rutaImagen
        );
        
        // Convertir el array a formato JSON y mostrarlo
        echo json_encode($informacionUsuario);
    } else {
        echo "No se encontró ningún registro para el usuario $usuario";
    }
} else {
    echo "No se proporcionó un nombre de usuario";
}

$conn->close();
?>
