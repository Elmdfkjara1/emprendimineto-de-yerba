<?php
// controllers/UsuarioController.php
// Incluye el modelo que permite consultar y registrar usuarios
// en la base de datos.
require_once __DIR__ . "/../models/Usuario.php";
// Incluye la clase encargada de generar y verificar
// hashes de contraseñas.
require_once __DIR__ . "/../utils/Hash.php";
// Incluye la clase encargada de generar y verificar
// tokens JWT para identificar usuarios autenticados.
require_once __DIR__ . "/../utils/Jwt.php";
// Incluye la clase que permite enviar respuestas en formato JSON.
require_once __DIR__ . "/../utils/Response.php";
// El controlador recibe las solicitudes relacionadas con
// los usuarios y coordina las acciones necesarias.
class UsuarioController {
 // Guarda una instancia del modelo Usuario.
 // Se utiliza para acceder a sus métodos.
 private $modelo;
 // Constructor de la clase.
 // Se ejecuta automáticamente al crear un objeto UsuarioController.
 public function __construct() {
 // Crea un objeto del modelo Usuario.
 $this->modelo = new Usuario();
 }
 // POST /usuarios/registro
 // Método encargado de registrar un usuario nuevo.
 // Recibe en $datos la información enviada en la solicitud.
 public function registro($datos) {
 // Busca si ya existe un usuario con el email recibido.
 $existe = $this->modelo->buscarPorEmail($datos["email"]);
 // Si la búsqueda devuelve un usuario, significa
 // que ese correo ya está registrado.
 if ($existe) {
 // Envía una respuesta JSON con un mensaje de error
 // y el código HTTP 400 (solicitud incorrecta).
 Response::json(["error" => "Ese email ya está registrado"], 400);
 // Finaliza el método para evitar que continúe
 // con el registro.
 return;
 }
 // Genera un hash seguro a partir de la contraseña
 // recibida. No se debe guardar la contraseña original.
 $hash = Hash::generar($datos["contraseña"]);
 // Llama al método crear() del modelo Usuario.
 // Envía el nombre, el email y el hash de la contraseña.
 $this->modelo->crear($datos["nombre"], $datos["email"], $hash);
 // Informa que el usuario fue registrado correctamente.
 // El código HTTP 201 indica que se creó un recurso.
 Response::json(["mensaje" => "Usuario registrado"], 201);
 }
 // POST /usuarios/login
 // Método encargado de iniciar sesión.
 // Recibe el email y la contraseña ingresados por el usuario.
 public function login($datos) {
 // Busca en la base de datos al usuario que tenga
 // el email recibido.
 $usuario = $this->modelo->buscarPorEmail($datos["email"]);
 // Comprueba dos condiciones:
 // 1. Que el usuario exista.
 // 2. Que la contraseña ingresada coincida con el hash
 // almacenado en la base de datos.
 //
 // El operador || significa "o".
 // Si alguna de las condiciones se cumple, el acceso falla.
 if (!$usuario || !Hash::verificar($datos["contraseña"],
$usuario["contraseña"])) {
 // Envía un mensaje de error y el código HTTP 401,
 // que indica que la autenticación no fue válida.
 Response::json(["error" => "Email o contraseña incorrectos"], 401);
 // Finaliza el método para no generar un token.
 return;
 }
 // Si las credenciales son correctas, genera un token JWT.
 // Incluye el ID, el email y el rol del usuario.
 // Estos datos permitirán identificarlo en otras solicitudes.
 $token = Jwt::generar([
 "id" => $usuario["id"],
 "email" => $usuario["email"],
 "rol" => $usuario["rol"]
 ]);
 // Devuelve una respuesta JSON con dos elementos:
 // - token: el JWT generado para la sesión.
 // - usuario: algunos datos del usuario autenticado.
 //
 // No incluye la contraseña en la respuesta.
 // El código HTTP 200 indica que la operación fue exitosa.
 Response::json(["token" => $token, "usuario" => [
 "id" => $usuario["id"], "nombre" => $usuario["nombre"], "rol" =>
$usuario["rol"]
 ]], 200);
 }
 // GET /usuarios
 // Método que obtiene los datos del perfil del usuario.
 // Requiere que previamente se haya validado el token.
 //
 // $usuarioToken contiene los datos extraídos del token JWT.
 public function perfil($usuarioToken) {
 // Busca en la base de datos al usuario cuyo ID
 // está incluido en el token.
 $usuario = $this->modelo->buscarPorId($usuarioToken["id"]);
 // Devuelve los datos encontrados en formato JSON
 // con el código HTTP 200.
 Response::json($usuario, 200);
  }
}
?>