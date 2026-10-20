<?php
require_once __DIR__ . "/../core/Model.php";
 
class Compra extends Model {
 
    public function finalizar($idUsuario, $idCarrito, $productosCarrito) {
        $total = 0;
 
        foreach ($productosCarrito as $p) {
            $total += $p["cantidad"] * $p["precio_unitario"];
        }
 
        $sql = "INSERT INTO compras (id_usuario, total, fecha) VALUES (:id_usuario, :total, NOW())";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(["id_usuario" => $idUsuario, "total" => $total]);
 
        $idCompra = $this->pdo->lastInsertId();
 
        foreach ($productosCarrito as $p) {
            $subtotal = $p["cantidad"] * $p["precio_unitario"];
 
            $sql = "INSERT INTO detalles_compra
                    (id_compra, id_producto, cantidad, precio_unitario, subtotal)
                    VALUES (:id_compra, :id_producto, :cantidad, :precio_unitario, :subtotal)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                "id_compra" => $idCompra,
                "id_producto" => $p["id_producto"],
                "cantidad" => $p["cantidad"],
                "precio_unitario" => $p["precio_unitario"],
                "subtotal" => $subtotal
            ]);
        }
 
        $sql = "UPDATE carrito SET estado = 'cerrado' WHERE id_carrito = :id_carrito";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(["id_carrito" => $idCarrito]);
 
        return $idCompra;
    }
 
    public function historial($idUsuario) {
        $sql = "SELECT * FROM compras WHERE id_usuario = :id_usuario ORDER BY fecha DESC";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(["id_usuario" => $idUsuario]);
 
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
 
    public function detalle($idCompra) {
        $sql = "SELECT dc.*, p.nombre
                FROM detalles_compra dc
                JOIN productos p ON dc.id_producto = p.id
                WHERE dc.id_compra = :id_compra";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(["id_compra" => $idCompra]);
 
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
 
    public function getById($idCompra) {
        $sql = "SELECT * FROM compras WHERE id_compra = :id_compra";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(["id_compra" => $idCompra]);
 
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>