<?php
// controllers/CarritoController.php
// Incluye el modelo que permite administrar los carritos
// y sus productos en la base de datos.
require_once __DIR__ . "/../models/Carrito.php";
// Incluye el modelo que permite consultar los productos
// disponibles en la base de datos.
require_once __DIR__ . "/../models/Producto.php";
// Incluye la clase que permite enviar respuestas en formato JSON.
require_once __DIR__ . "/../utils/Response.php";
// Controlador encargado de gestionar las solicitudes
// relacionadas con el carrito de compras.
class CarritoController {
 // Guarda un objeto del modelo Carrito.
 private $modelo;
 // Guarda un objeto del modelo Producto.
 // Se utiliza para consultar los datos de los productos.
 private $productoModelo;
 // Constructor de la clase.
 // Se ejecuta automáticamente al crear el controlador.
 public function __construct() {
 // Crea un objeto para trabajar con los carritos.
 $this->modelo = new Carrito();
 // Crea un objeto para consultar los productos.
 $this->productoModelo = new Producto();
 }
 // GET /carrito
 // Obtiene el detalle del carrito del usuario autenticado.
 public function ver($usuario) {
 // Busca el carrito abierto del usuario.
 // Si no existe, el modelo crea uno nuevo.
 // Se utiliza el ID del usuario recibido.
 $carrito = $this->modelo->obtenerOCrear($usuario["id"]);
 // Obtiene los productos que contiene ese carrito.
 // Para ello, utiliza el ID del carrito.
 $detalle = $this->modelo->verDetalle($carrito["id_carrito"]);
 // Devuelve el detalle del carrito en formato JSON.
 // El código HTTP 200 indica que la solicitud fue exitosa.
 Response::json($detalle, 200);
 }
 // POST /carrito/agregar
 // Agrega un producto al carrito del usuario autenticado.
 // $datos contiene la información enviada en la solicitud.
 public function agregar($usuario, $datos) {
 // Busca el carrito abierto del usuario.
 // Si no existe, crea uno nuevo.
 $carrito = $this->modelo->obtenerOCrear($usuario["id"]);
 // Busca el producto en la base de datos utilizando su ID.
 // El ID del producto se recibe dentro de $datos.
 $producto = $this->productoModelo->getById($datos["id_producto"]);
 // Comprueba si el producto existe.
 if (!$producto) {
 // Si no existe, devuelve un error 404.
 Response::json(["error" => "Producto no encontrado"], 404);
 // Finaliza el método para no continuar con la operación.
 return;
 }
 // Llama al modelo Carrito para agregar el producto.
 // Envía cuatro datos:
 // 1. ID del carrito.
 // 2. ID del producto.
 // 3. Cantidad solicitada.
 // 4. Precio del producto obtenido de la base de datos.
 //
 // El modelo se encarga de insertar el producto o sumar
 // la cantidad si ya estaba incluido en el carrito.
 $this->modelo->agregarProducto(
 $carrito["id_carrito"],
 $datos["id_producto"],
 $datos["cantidad"],
 $producto["precio"]
 );
 // Informa que el producto fue agregado al carrito.
 // El código HTTP 201 indica que se creó un recurso.
 Response::json(["mensaje" => "Producto agregado al carrito"], 201);
 }
 // PUT /carrito/actualizar/{idProducto}
 // Modifica la cantidad de un producto del carrito.
 // Recibe los datos del usuario, el ID del producto
 // y los datos enviados en la solicitud.
 public function actualizar($usuario, $idProducto, $datos) {
 // Busca el carrito abierto correspondiente al usuario.
 $carrito = $this->modelo->obtenerOCrear($usuario["id"]);
 // Llama al modelo para actualizar la cantidad.
 // Envía el ID del carrito, el ID del producto
 // y la nueva cantidad recibida en $datos.
 $this->modelo->actualizarCantidad(
 $carrito["id_carrito"],
 $idProducto,
 $datos["cantidad"]
 );
 // Devuelve un mensaje de confirmación.
 // El código HTTP 200 indica que la solicitud fue exitosa.
 Response::json(["mensaje" => "Cantidad actualizada"], 200);
 }
 // DELETE /carrito/eliminar/{idProducto}
 // Elimina un producto específico del carrito.
 public function eliminar($usuario, $idProducto) {
 // Busca el carrito abierto del usuario autenticado.
 $carrito = $this->modelo->obtenerOCrear($usuario["id"]);
 // Llama al modelo para eliminar el producto indicado
 // del carrito correspondiente.
 $this->modelo->eliminarProducto(
 $carrito["id_carrito"],
 $idProducto
 );
 // Devuelve un mensaje de confirmación.
 Response::json(["mensaje" => "Producto eliminado del carrito"], 200);
 }
 // DELETE /carrito/vaciar
 // Elimina todos los productos del carrito del usuario.
 public function vaciar($usuario) {
 // Busca el carrito abierto del usuario autenticado.
 $carrito = $this->modelo->obtenerOCrear($usuario["id"]);
 // Llama al modelo para eliminar todos los detalles
 // asociados al carrito, sin eliminar el carrito en sí.
 $this->modelo->vaciar($carrito["id_carrito"]);
 // Devuelve un mensaje de confirmación.
 Response::json(["mensaje" => "Carrito vaciado"], 200);
 }
}
?>
