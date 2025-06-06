<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

$conexion = new mysqli("localhost", "root", "", "destinix");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$metodo = $_SERVER['REQUEST_METHOD'];

switch ($metodo) {
    case 'GET':
        $result = $conexion->query("SELECT * FROM persona");
        $personas = [];

        while ($fila = $result->fetch_assoc()) {
            $fila['foto_perfil'] = "http://localhost/destinix/img/" . $fila['foto_perfil'];
            $personas[] = $fila;
        }

        echo json_encode($personas);
        break;

    case 'POST':
        $nombre = $_POST['nombre_usu'];
        $apellido = $_POST['apellido_usu'];
        $tipoDoc = $_POST['tipo_documento'];
        $documento = $_POST['documento'];
        $email = $_POST['email_usu'];
        $telefono = $_POST['telefono_usu'];
        $genero = $_POST['genero'];
        $localidad = $_POST['localidad'];
        $fechaNacimiento = $_POST['fecha_nacimiento'];
        $contraseña = $_POST['contraseña'];
        $idSeguridad = $_POST['id_seguridad'];
        $rolId = $_POST['rol_idRol'];

        $fotoPerfil = "";
        if (isset($_FILES['foto_perfil'])) {
            $archivo = $_FILES['foto_perfil']['tmp_name'];
            $nombreArchivo = $_FILES['foto_perfil']['name'];
            move_uploaded_file($archivo, "img/" . $nombreArchivo);
            $fotoPerfil = $nombreArchivo;
        }

        $stmt = $conexion->prepare("INSERT INTO persona (nombre_usu, apellido_usu, tipo_documento, documento, email_usu, telefono_usu, genero, localidad, fecha_nacimiento, contraseña, id_seguridad, rol_idRol, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssssssss", $nombre, $apellido, $tipoDoc, $documento, $email, $telefono, $genero, $localidad, $fechaNacimiento, $contraseña, $idSeguridad, $rolId, $fotoPerfil);
        $stmt->execute();
        echo json_encode(["success" => true]);
        break;

    case 'PUT':
        $datos = json_decode(file_get_contents("php://input"), true);

        $id = $datos['id_persona'];
        $nombre = $datos['nombre_usu'];
        $apellido = $datos['apellido_usu'];
        $tipoDoc = $datos['tipo_documento'];
        $documento = $datos['documento'];
        $email = $datos['email_usu'];
        $telefono = $datos['telefono_usu'];
        $genero = $datos['genero'];
        $localidad = $datos['localidad'];
        $fechaNacimiento = $datos['fecha_nacimiento'];
        $contraseña = $datos['contraseña'];
        $idSeguridad = $datos['id_seguridad'];
        $rolId = $datos['rol_idRol'];

        $stmt = $conexion->prepare("UPDATE persona SET nombre_usu=?, apellido_usu=?, tipo_documento=?, documento=?, email_usu=?, telefono_usu=?, genero=?, localidad=?, fecha_nacimiento=?, contraseña=?, id_seguridad=?, rol_idRol=? WHERE id_persona=?");
        $stmt->bind_param("ssssssssssssi", $nombre, $apellido, $tipoDoc, $documento, $email, $telefono, $genero, $localidad, $fechaNacimiento, $contraseña, $idSeguridad, $rolId, $id);
        $stmt->execute();
        echo json_encode(["success" => true]);
        break;

    case 'DELETE':
        $datos = json_decode(file_get_contents("php://input"), true);
        $id = $datos['id_persona'];

        $stmt = $conexion->prepare("DELETE FROM persona WHERE id_persona=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        echo json_encode(["success" => true]);
        break;
}
?>
