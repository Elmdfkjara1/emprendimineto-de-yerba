<?php
// utils/Response.php

// Clase encargada de preparar y enviar las respuestas de la API al cliente.
class Response {

    // Método estático que recibe los datos que queremos enviar y el código de
    // respuesta HTTP (por defecto es 200 cuando todo sale bien).
    public static function json($datos, $codigo = 200) {
        // Establecemos el código de respuesta HTTP.
        // Ej: 200 = éxito, 404 = no encontrado, 201 = creado, 400 = error de solicitud.
        http_response_code($codigo);

        // Indicamos que la respuesta enviada tiene formato JSON.
        header("Content-Type: application/json");

        // Convertimos los datos de PHP a formato JSON y los enviamos al cliente.
        echo json_encode($datos);
    }
}
?> 