<?php
// utils/Jwt.php

// Clase encargada de generar y verificar tokens JWT.
// Estos tokens permiten identificar a un usuario
// y comprobar su autenticación en la API.
class Jwt {

    // Clave secreta utilizada para generar y verificar
    // la firma del token.
    // En un proyecto real, debe guardarse en un archivo
    // de configuración seguro, como .env, y no directamente
    // dentro del código.
    private static $secreto = "clave-secreta-del-proyecto";

    // Convierte los datos a Base64 URL-safe.
    // Esta codificación permite utilizar los datos dentro
    // de una URL sin ciertos caracteres problemáticos.
    private static function base64UrlEncode($datos) {
        // base64_encode() codifica los datos en Base64.
        // strtr() reemplaza los caracteres + y / por - y _.
        // rtrim() elimina los signos = del final.
        return rtrim(strtr(base64_encode($datos), "+/", "-_"), "=");
    }

    // Convierte los datos codificados nuevamente a su
    // representación original.
    private static function base64UrlDecode($datos) {
        // Reemplaza - y _ por los caracteres utilizados
        // en la codificación Base64 tradicional.
        // Luego, base64_decode() decodifica los datos.
        return base64_decode(strtr($datos, "-_", "+/"));
    }

    // Genera un token JWT a partir de los datos del usuario.
    // El parámetro $payload contiene la información que
    // queremos incluir en el token.
    public static function generar($payload) {
        // Crea el encabezado del token.
        // "alg" indica el algoritmo utilizado para la firma.
        // "typ" indica que se trata de un token JWT.
        // 
        // json_encode() convierte el arreglo en texto JSON.
        // Luego, base64UrlEncode() codifica ese texto.
        $header = self::base64UrlEncode(
            json_encode(["alg" => "HS256", "typ" => "JWT"])
        );

        // Agrega al payload la fecha y hora de vencimiento.
        // time() devuelve la fecha y hora actual en segundos.
        // 60 * 60 * 24 equivale a 24 horas.
        $payload["exp"] = time() + (60 * 60 * 24);

        // Convierte los datos del usuario y su vencimiento
        // a JSON y luego los codifica.
        $payloadCod = self::base64UrlEncode(json_encode($payload));

        // Genera la firma digital del token.
        // hash_hmac() utiliza el algoritmo SHA-256 y la
        // clave secreta para crear una firma.
        // La firma permite detectar si el token fue modificado.
        $firma = hash_hmac(
            "sha256",
            "$header.$payloadCod",
            self::$secreto,
            true
        );

        // Codifica la firma para incorporarla al token.
        $firmaCod = self::base64UrlEncode($firma);

        // Devuelve las tres partes del JWT separadas por puntos:
        // encabezado.payload.firma
        return "$header.$payloadCod.$firmaCod";
    }

    // Verifica un token recibido.
    // Si es válido y no venció, devuelve los datos del usuario.
    // Si no es válido, devuelve false.
    public static function verificar($token) {
        // Dividimos el token en sus tres partes utilizando el punto como separador.
        $partes = explode(".", $token);

        if (count($partes) !== 3) {
            return false;
        }

        [$header, $payloadCod, $firmaRecibida] = $partes;

        // Volvemos a generar la firma usando los mismos datos y la clave secreta
        // para comprobar que el token no haya sido alterado.
        $firmaCalculada = hash_hmac(
            "sha256",
            "$header.$payloadCod",
            self::$secreto,
            true
        );

        $firmaCalculadaCod = self::base64UrlEncode($firmaCalculada);

        // Comparamos la firma calculada con la firma que vino en el token.
        // hash_equals previene ataques de tiempo de ejecución.
        if (!hash_equals($firmaCalculadaCod, $firmaRecibida)) {
            return false;
        }

        // Decodificamos el payload para leer su contenido.
        $payloadJson = self::base64UrlDecode($payloadCod);
        $payload = json_decode($payloadJson, true);

        if (!$payload) {
            return false;
        }

        // Verificamos si el token ya expiró comparando con el tiempo actual.
        if (isset($payload["exp"]) && $payload["exp"] < time()) {
            return false; // Token vencido
        }

        // Si todo está bien, devolvemos los datos guardados dentro del token.
        return $payload;
    }
}
?>