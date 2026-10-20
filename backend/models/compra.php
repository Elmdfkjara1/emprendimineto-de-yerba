<?php
// Indicamos que este archivo contiene el modelo Compra.
// Incluimos la clase Model, que contiene la conexión
// a la base de datos.
require_once __DIR__ . "/../core/Model.php";
// Creamos la clase Compra.
// Al extender Model, puede utilizar la conexión $this->pdo.
class Compra extends Model {
 // Finaliza una compra a partir de los productos del carrito.
 // Recibe el ID del usuario, el ID del carrito
 // y los productos que se encuentran en él.
 public function finalizar($idUsuario, $idCarrito, $productosCarrito) {
 // Inicializamos el total de la compra en cero
 $total = 0;
 // Recorremos todos los productos del carrito.
 foreach ($productosCarrito as $p) {
 // Calculamos el subtotal de cada producto
 // multiplicando la cantidad por el precio unitario.
 // Sumamos ese resultado al total de la compra.
 $total += $p["cantidad"] * $p["precio_unitario"];
 } // Finaliza el recorrido de los productos.
 // Preparamos la consulta SQL para registrar la compra.
 // Se guarda el usuario, el total y la fecha actual.
 $sql = "INSERT INTO compras (id_usuario, total, fecha) VALUES
(:id_usuario, :total, NOW())";
 // Preparamos la consulta para ejecutarla con parámetros.
 $stmt = $this->pdo->prepare($sql);
 // Ejecutamos la consulta y enviamos los valores correspondientes.
 $stmt->execute(["id_usuario" => $idUsuario, "total" => $total]);
 // Obtenemos el ID de la compra que se acaba de registrar.
 $idCompra = $this->pdo->lastInsertId();
 // Recorremos nuevamente los productos del carrito.
 // Ahora vamos a guardar cada producto como un detalle de la compra.
 foreach ($productosCarrito as $p) {
 // Calculamos el subtotal del producto.
 $subtotal = $p["cantidad"] * $p["precio_unitario"];
 // Preparamos la consulta para insertar un detalle de compra.
 // Se registra qué producto se compró, la cantidad,
 // el precio unitario y el subtotal.
 $sql = "INSERT INTO detalles_compra
 (id_compra, id_producto, cantidad, precio_unitario,
subtotal)
 VALUES (:id_compra, :id_producto, :cantidad,
:precio_unitario, :subtotal)";
 // Preparamos la consulta SQL.
 $stmt = $this->pdo->prepare($sql);
 // Ejecutamos la consulta y enviamos los datos del producto.
 $stmt->execute([
 // ID de la compra a la que pertenece el detalle.
 "id_compra" => $idCompra,
 // ID del producto comprado.
 "id_producto" => $p["id_producto"],
 // Cantidad de unidades compradas.
 "cantidad" => $p["cantidad"],
 // Precio de una unidad del producto.
 "precio_unitario" => $p["precio_unitario"],
 // Resultado de multiplicar cantidad por precio unitario.
 "subtotal" => $subtotal
 ]);
 } // Finaliza el recorrido de los detalles de la compra.
 // Cerramos el carrito utilizado para esta compra.
 // De esta manera, el sistema puede crear o utilizar
 // otro carrito para una compra posterior.
 $sql = "UPDATE carrito SET estado = 'cerrado' WHERE id_carrito =
:id_carrito";
 // Preparamos la consulta SQL.
 $stmt = $this->pdo->prepare($sql);
 // Ejecutamos la consulta indicando qué carrito se debe cerrar.
 $stmt->execute(["id_carrito" => $idCarrito]);
 // Devolvemos el ID de la compra registrada.
 // Este dato puede ser utilizado por el controlador.
 return $idCompra;
 } // Finaliza el método finalizar.
 // Obtiene el historial de compras de un usuario.
 // Recibe el ID del usuario que queremos consultar.
 public function historial($idUsuario) {
 // Consultamos las compras que pertenecen a ese usuario.
 // ORDER BY fecha DESC ordena desde la más reciente
 // hasta la más antigua.
 $sql = "SELECT * FROM compras WHERE id_usuario = :id_usuario ORDER BY
fecha DESC";
 // Preparamos la consulta.
 $stmt = $this->pdo->prepare($sql);
 // Ejecutamos la consulta indicando el ID del usuario.
 $stmt->execute(["id_usuario" => $idUsuario]);
 // Devolvemos todas las compras encontradas
 // como un arreglo de arreglos asociativos.
 return $stmt->fetchAll(PDO::FETCH_ASSOC);
 } // Finaliza el método historial.
 // Obtiene los productos que forman parte de una compra.
 // Recibe el ID de la compra que queremos consultar.
 public function detalle($idCompra) {
 // Consultamos los detalles de la compra y el nombre de cada producto.
 // dc.* selecciona todas las columnas de detalles_compra.
 // p.nombre obtiene el nombre desde la tabla productos.
 // JOIN relaciona ambas tablas mediante el ID del producto.
 // WHERE filtra los resultados por el ID de la compra.
 $sql = "SELECT dc.*, p.nombre
 FROM detalles_compra dc
 JOIN productos p ON dc.id_producto = p.id
 WHERE dc.id_compra = :id_compra";
 // Preparamos la consulta SQL.
 $stmt = $this->pdo->prepare($sql);
 // Ejecutamos la consulta con el ID de la compra.
 $stmt->execute(["id_compra" => $idCompra]);
 // Devolvemos todos los productos asociados a esa compra.
 return $stmt->fetchAll(PDO::FETCH_ASSOC);
 } // Finaliza el método detalle.
 // Busca una compra específica por su ID.
 public function getById($idCompra) {
 // Preparamos una consulta para obtener los datos de la compra.
 $sql = "SELECT * FROM compras WHERE id_compra = :id_compra";
 // Preparamos la consulta SQL.
 $stmt = $this->pdo->prepare($sql);
 // Ejecutamos la consulta indicando el ID de la compra.
 $stmt->execute(["id_compra" => $idCompra]);
 // Devolvemos un único registro como arreglo asociativo.
 // Si la compra no existe, fetch devuelve false.
 return $stmt->fetch(PDO::FETCH_ASSOC);
 } // Finaliza el método getById.
} // Finaliza la clase Compra