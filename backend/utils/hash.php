<?php
// utils/Hash.php

// Clase encargada de generar y verificar hashes
// para proteger las contraseñas de los usuarios.
class Hash {

    // Método estático que recibe un texto, por ejemplo,
    // una contraseña, y genera un hash para almacenarlo
    // de forma segura en la base de datos.
    public static function generar($texto) {    
        // password_hash() transforma la contraseña en un hash.
        // PASSWORD_DEFAULT utiliza el algoritmo recomendado
        // por PHP por defecto.
        //
        // No se guarda la contraseña original,
        // sino el hash generado.
        return password_hash($texto, PASSWORD_DEFAULT); // hash seguro
    }

    // Método estático que permite comprobar si una contraseña
    // coincide con un hash almacenado previamente.
    public static function verificar($texto, $hash) {
        // password_verify() compara la contraseña ingresada
        // con el hash guardado en la base de datos.
        //
        // Devuelve true si coinciden o false si no coinciden.
        // No es necesario volver a generar el hash manualmente.
        return password_verify($texto, $hash); // true/false
    }

}
?>