<?php
// models/Carrito.php

// Incluye la clase Model, que proporciona la conexión
// a la base de datos mediante PDO.
require_once __DIR__ . "/../core/Model.php";

// La clase Carrito hereda de Model.
// Por eso puede utilizar la conexión a la base de datos
// a través de $this->pdo.
class Carrito extends Model {

    // Busca el carrito abierto de un usuario.
    // Si no existe, crea uno nuevo y lo devuelve.
    public function obtenerOCrear($idUsuario) {
        $sql = "SELECT * FROM carrito WHERE id_usuario = :id_usuario AND estado = 'abierto'";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(["id_usuario" => $idUsuario]);
        $carrito = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$carrito) {
            $sql = "INSERT INTO carrito (id_usuario, estado) VALUES (:id_usuario, 'abierto')";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute(["id_usuario" => $idUsuario]);
            
            $idCarrito = $this->pdo->lastInsertId();

            return [
                "id_carrito" => $idCarrito,
                "id_usuario" => $idUsuario,
                "estado" => "abierto"
            ];
        }

        return $carrito;
    }

    // Obtiene el detalle de un carrito.
    // Devuelve información de los productos que contiene,
    // como nombre, imagen, cantidad y precio unitario.
    public function verDetalle($idCarrito) {
        $sql = "SELECT dc.id_producto, p.nombre, p.imagen, dc.cantidad, dc.precio_unitario 
                FROM detalles_carrito dc 
                JOIN productos p ON dc.id_producto = p.id 
                WHERE dc.id_carrito = :id_carrito";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(["id_carrito" => $idCarrito]);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Agrega un producto al carrito.
    // Si ese producto ya está en el carrito, suma la cantidad.
    // Si todavía no está, crea un nuevo detalle.
    public function agregarProducto($idCarrito, $idProducto, $cantidad, $precioUnitario) {
        $sql = "SELECT * FROM detalles_carrito WHERE id_carrito = :id_carrito AND id_producto = :id_producto";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            "id_carrito" => $idCarrito,
            "id_producto" => $idProducto
        ]);
        $detalle = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($detalle) {
            // Si ya existe, actualiza sumando la nueva cantidad
            $nuevaCantidad = $detalle["cantidad"] + $cantidad;
            $sql = "UPDATE detalles_carrito SET cantidad = :cantidad WHERE id_carrito = :id_carrito AND id_producto = :id_producto";
            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute([
                "cantidad" => $nuevaCantidad,
                "id_carrito" => $idCarrito,
                "id_producto" => $idProducto
            ]);
        } else {
            // Si no existe, inserta el nuevo producto con su precio unitario
            $sql = "INSERT INTO detalles_carrito (id_carrito, id_producto, cantidad, precio_unitario) 
                    VALUES (:id_carrito, :id_producto, :cantidad, :precio_unitario)";
            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute([
                "id_carrito" => $idCarrito,
                "id_producto" => $idProducto,
                "cantidad" => $cantidad,
                "precio_unitario" => $precioUnitario
            ]);
        }
    }

    // Actualiza la cantidad de un producto específico en el carrito.
    public function actualizarCantidad($idCarrito, $idProducto, $cantidad) {
        $sql = "UPDATE detalles_carrito SET cantidad = :cantidad WHERE id_carrito = :id_carrito AND id_producto = :id_producto";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            "cantidad" => $cantidad,
            "id_carrito" => $idCarrito,
            "id_producto" => $idProducto
        ]);
    }

    // Elimina un producto específico del carrito.
    public function eliminarProducto($idCarrito, $idProducto) {
        $sql = "DELETE FROM detalles_carrito WHERE id_carrito = :id_carrito AND id_producto = :id_producto";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            "id_carrito" => $idCarrito,
            "id_producto" => $idProducto
        ]);
    }

    // Vacía todo el contenido del carrito.
    public function vaciar($idCarrito) {
        $sql = "DELETE FROM detalles_carrito WHERE id_carrito = :id_carrito";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(["id_carrito" => $idCarrito]);
    }
}
?>