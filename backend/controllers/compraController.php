<?php
// Indicamos que este archivo contiene el controlador de las compras.
// Incluimos el modelo Compra, que se encarga de trabajar
// con los datos de las compras en la base de datos.
require_once __DIR__ . "/../models/Compra.php";
// Incluimos el modelo Carrito, que permite consultar
// el carrito del usuario y los productos que contiene.
require_once __DIR__ . "/../models/Carrito.php";
// Incluimos la clase Response, que permite enviar
// respuestas al cliente en formato JSON.
require_once __DIR__ . "/../utils/Response.php";
// Declaramos la clase CompraController.
// Este controlador coordina las acciones relacionadas con las compras.
class CompraController {
 // Variable que guardará una instancia del modelo Compra.
 private $modelo;
 // Variable que guardará una instancia del modelo Carrito.
 private $carritoModelo;
 // Constructor: se ejecuta automáticamente cuando creamos
 // un objeto de la clase CompraController.
 public function __construct() {
 // Creamos un objeto del modelo Compra.
 $this->modelo = new Compra();
 // Creamos un objeto del modelo Carrito.
 $this->carritoModelo = new Carrito();
 } // Finaliza el constructor.
 // POST /compras/finalizar
 // Este método permite finalizar una compra.
 // Recibe los datos del usuario autenticado.
 public function finalizar($usuario) {
 // Buscamos el carrito del usuario.
 // Si no tiene uno disponible, obtenerOCrear() crea uno.
 // Se utiliza el ID del usuario para identificar su carrito.
 $carrito = $this->carritoModelo->obtenerOCrear($usuario["id"]);
 // Obtenemos los productos que contiene el carrito.
 // Para ello, enviamos el ID del carrito al método verDetalle().
 $productos = $this->carritoModelo->verDetalle($carrito["id_carrito"]);
 // Verificamos si el carrito no contiene productos.
 // empty() devuelve true cuando el arreglo está vacío.
 if (empty($productos)) {
 // Enviamos una respuesta JSON con un mensaje de error.
 // El código HTTP 400 indica que la solicitud no puede procesarse
 // porque no hay productos para comprar.
 Response::json(["error" => "El carrito está vacío"], 400);
 // Detenemos este método para que no continúe con la compra.
 return;
 } // Finaliza la condición que verifica si el carrito está vacío.
 // Llamamos al método finalizar() del modelo Compra.
 // Le enviamos el ID del usuario, el ID del carrito
 // y los productos que se van a comprar.
 // El modelo registra la compra y sus detalles en la base de datos.
 $idCompra = $this->modelo->finalizar(
 $usuario["id"], $carrito["id_carrito"], $productos
 );
 // Enviamos una respuesta JSON indicando que la compra se realizó.
 // También devolvemos el ID de la compra creada.
 // El código HTTP 201 indica que se creó un nuevo registro.
 Response::json(["mensaje" => "Compra realizada", "id_compra" =>
$idCompra], 201);
 } // Finaliza el método finalizar.
 // GET /compras
 // Este método permite consultar el historial de compras del usuario.
 public function historial($usuario) {
 // Llamamos al método historial() del modelo Compra.
 // Le pasamos el ID del usuario para obtener solamente sus compras.
 // Luego enviamos los resultados al cliente en formato JSON.
 // El código HTTP 200 indica que la consulta se procesó correctamente.
 Response::json($this->modelo->historial($usuario["id"]), 200);
 } // Finaliza el método historial.
} // Finaliza la clase CompraController.