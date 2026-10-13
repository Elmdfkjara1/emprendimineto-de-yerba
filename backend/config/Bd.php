<?php
// config/Bd.php

// Clase encargada de crear y administrar la conexión con la base de datos.
class Bd {
    // Variable estática donde se guarda la conexión. Comienza con null porque aun no hay una conexión creada.
    private static $conexion = null;

    // Método estático que permite obtener la conexión con la base de datos.
    public static function conectar() {
        // Verificamos si todavía no existe una conexión. Si la conexión ya fue creada, no se crea otra.
        if (self::$conexion === null) {
            // Creamos una nueva conexión utilizando PDO.
            self::$conexion = new PDO(
                // Datos de conexión:
                // localhost: servidor donde está MySQL.
                // BDpasantias: nombre de la base de datos.
                // utf8: permite trabajar correctamente con caracteres especiales.
                "mysql:host=localhost;dbname=BDpasantias;charset=utf8",
                // Usuario de MySQL.
                "root",
                // Contraseña de MySQL.
                // En XAMPP, normalmente está vacía.
                ""
            );

            // Configuramos PDO para que, si ocurre un error, genere una excepción.
            // Esto permite detectar y controlar errores de conexión o de las consultas SQL.
            self::$conexion->setAttribute(
                PDO::ATTR_ERRMODE,
                PDO::ERRMODE_EXCEPTION
            );
        }

        // Devolvemos la conexión creada para poder utilizarla desde otras partes del proyecto.
        return self::$conexion;
    }
}

?>