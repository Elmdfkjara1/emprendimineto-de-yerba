<?php
// core/Model.php

// Incluimos el archivo que contiene la clase Bd, encargada de realizar la conexión con la base de datos.
require_once __DIR__ . "/../config/Bd.php";

class Model {
    // Variable que almacena la conexión con la base de datos.
    // "protected" permite que esta variable pueda ser utilizada
    // por esta clase y también por las clases que hereden de ella.
    protected $pdo;

    // Constructor de la clase.
    // Se ejecuta automáticamente cuando se crea un objeto de Model
    // o de una clase que hereda de Model.
    public function __construct() {
        // Obtenemos la conexión a la base de datos
        // utilizando el método conectar() de la clase Bd.
        // La conexión queda guardada en la variable $pdo.
        $this->pdo = Bd::conectar();
    }
}