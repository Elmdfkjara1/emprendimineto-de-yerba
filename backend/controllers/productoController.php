<?php
require_once __DIR__ . "/../models/Producto.php";
require_once __DIR__ . "/../utils/Response.php";

class ProductoController {
    private $modelo;

    public function __construct() {
        $this->modelo = new Producto();
    }

    public function listar() {
        Response::json($this->modelo->getAll(), 200);
    }

    public function verUno($id) {
        $producto = $this->modelo->getById($id);

        $producto ? Response::json($producto, 200) : Response::json(["error" => "Producto no encontrado"], 404);
    }

    public function crear($datos) {
        $this->modelo->create(
            $datos["nombre"],
            $datos["descripcion"],
            $datos["precio"],
            $datos["imagen"]
        );

        Response::json(["mensaje" => "Producto creado"], 201);
    }

    public function editar($id, $datos) {
        $this->modelo->update($id, $datos);

        Response::json(["mensaje" => "Producto actualizado"], 200);
    }

    public function eliminar($id) {
        $this->modelo->delete($id);

        Response::json(["mensaje" => "Producto eliminado"], 200);
    }
}
?>