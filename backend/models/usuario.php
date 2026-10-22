<?php
// models/Usuario.php
// Incluye la clase Model, de la cual heredará Usuario.
// Model permite conectarse a la base de datos mediante PDO.
require_once __DIR__ . "/../core/Model.php";
// La clase Usuario hereda de Model.
// Esto significa que puede utilizar la conexión a la base
// de datos definida en la clase padre.
class Usuario extends Model {
 // Busca un usuario en la base de datos a partir de su email.
 // Recibe como parámetro el correo electrónico ingresado.
 public function buscarPorEmail($email) {
 // Prepara la consulta SQL para buscar un usuario
 // cuyo email coincida con el recibido.
 // :email es un parámetro que se completará después.
 $sql = "SELECT * FROM usuarios WHERE email = :email";
 // Prepara la consulta para poder enviar el email
 // como un parámetro separado de la instrucción SQL.
 $stmt = $this->pdo->prepare($sql);
 // Ejecuta la consulta y reemplaza :email por el valor
 // recibido en la variable $email.
 $stmt->execute(["email" => $email]);
 // Devuelve los datos del usuario encontrado
 // como un arreglo asociativo.
 // Si no encuentra ningún usuario, devuelve false.
 return $stmt->fetch(PDO::FETCH_ASSOC);
 }
 // Busca un usuario a partir de su identificador (ID).
 // Recibe el ID como parámetro.
 public function buscarPorId($id) {
 // Selecciona únicamente los datos necesarios del usuario.
 // No incluye la contraseña en el resultado.
 $sql = "SELECT id, nombre, email, rol, creado FROM usuarios WHERE id =
:id";
 // Prepara la consulta SQL.
 $stmt = $this->pdo->prepare($sql);
 // Ejecuta la consulta reemplazando :id por el ID recibido.
 $stmt->execute(["id" => $id]);
 // Devuelve los datos del usuario como un arreglo asociativo.
 // Si no existe un usuario con ese ID, devuelve false.
 return $stmt->fetch(PDO::FETCH_ASSOC); // sin la contraseña
 // Registra un usuario nuevo en la base de datos.
 // Recibe su nombre, email y contraseña ya convertida en hash.
 public function crear($nombre, $email, $contraseñaHash) {
 // Prepara la consulta SQL para insertar un usuario.
 // El rol se establece como 'user' y la fecha de creación
 // se obtiene con NOW(), que devuelve la fecha y hora actual.
 $sql = "INSERT INTO usuarios (nombre, email, contraseña, rol, creado)
 VALUES (:nombre, :email, :contraseña, 'user', NOW())";
 // Prepara la consulta antes de ejecutarla.
 $stmt = $this->pdo->prepare($sql);
 // Ejecuta la consulta y envía los valores correspondientes
 // a cada parámetro de la instrucción SQL.
 //
 // La contraseña que se guarda es el hash recibido,
 // no la contraseña original.
 // execute() devuelve true si se ejecuta correctamente
 // o false si la ejecución falla.
 return $stmt->execute([
 "nombre" => $nombre,
 "email" => $email,
 "contraseña" => $contraseñaHash
 ]);
 }
}
?>