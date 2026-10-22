<?php
// models/Producto.php
// Model de productos: contiene las consultas SQL sobre la tabla "productos".
 
require_once __DIR__ . "/Model.php";
 
class Producto extends Model {
 
    // Devuelve todos los productos.
    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM productos");
        return $stmt->fetchAll();
    }
 
    // Devuelve un producto por su ID (o false si no existe).
    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM productos WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
 
    // Crea un producto nuevo.
    public function create($nombre, $descripcion, $precio, $imagen) {
        $stmt = $this->db->prepare(
            "INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)"
        );
        $stmt->execute([$nombre, $descripcion, $precio, $imagen]);
        // Devolvemos el ID del producto recién creado.
        return $this->db->lastInsertId();
    }
 
    // Modifica un producto existente. $datos es un arreglo con los nuevos valores.
    public function update($id, $datos) {
        $stmt = $this->db->prepare(
            "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, imagen = ? WHERE id = ?"
        );
        return $stmt->execute([
            $datos["nombre"],
            $datos["descripcion"],
            $datos["precio"],
            $datos["imagen"],
            $id
        ]);
    }
 
    // Elimina un producto por su ID.
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM productos WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>