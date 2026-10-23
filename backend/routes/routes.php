
<?php

require_once __DIR__ . "/../utils/response.php";

function obtenerDatosJSON() {
    $contenido = file_get_contents("php://input");
    $datos = json_decode($contenido, true);

    if (!is_array($datos)) {
        Response::json(["error" => "El cuerpo debe ser JSON válido"], 400);
        exit;
    }

    return $datos;
}

$metodo = $_SERVER["REQUEST_METHOD"] ?? "GET";
$uri = parse_url($_SERVER["REQUEST_URI"] ?? "/", PHP_URL_PATH);
$partes = array_values(array_filter(explode("/", trim($uri, "/"))));

// Permite reconocer las rutas aunque la API esté bajo /backend/public.
$recursos = ["productos", "usuarios", "carrito", "compras", "pedidos"];
$indice = false;

foreach ($partes as $i => $parte) {
    if (in_array($parte, $recursos, true)) {
        $indice = $i;
        break;
    }
}

if ($indice === false) {
    Response::json(["error" => "Ruta no encontrada"], 404);
    exit;
}

$ruta = implode("/", array_slice($partes, $indice));

// PRODUCTOS
if (str_starts_with($ruta, "productos")) {
    require_once __DIR__ . "/../controllers/productoController.php";
    $controlador = new ProductoController();

    if ($ruta === "productos" && $metodo === "GET") {
        $controlador->listar();
    } elseif (preg_match('#^productos/([0-9]+)$#', $ruta, $m)
        && $metodo === "GET") {
        $controlador->verUno((int) $m[1]);
    } elseif ($ruta === "productos" && $metodo === "POST") {
        $controlador->crear(obtenerDatosJSON());
    } elseif (preg_match('#^productos/([0-9]+)$#', $ruta, $m)
        && $metodo === "PUT") {
        $controlador->editar((int) $m[1], obtenerDatosJSON());
    } elseif (preg_match('#^productos/([0-9]+)$#', $ruta, $m)
        && $metodo === "DELETE") {
        $controlador->eliminar((int) $m[1]);
    } else {
        Response::json(["error" => "Ruta o método HTTP no válido"], 404);
    }

    exit;
}

// USUARIOS
if ($ruta === "usuarios/registro" && $metodo === "POST") {
    require_once __DIR__ . "/../controllers/usuarioController.php";
    (new UsuarioController())->registro(obtenerDatosJSON());
    exit;
}

if ($ruta === "usuarios/login" && $metodo === "POST") {
    require_once __DIR__ . "/../controllers/usuarioController.php";
    (new UsuarioController())->login(obtenerDatosJSON());
    exit;
}

if ($ruta === "usuarios" && $metodo === "GET") {
    Response::json([
        "error" => "El perfil requiere validar el token de autenticación"
    ], 401);
    exit;
}

// CARRITO, COMPRAS Y PEDIDOS
// Se dejan pendientes hasta integrar autenticación y confirmar
// los métodos que implementarán los responsables de esos controladores.

Response::json([
    "error" => "Ruta pendiente de integración",
    "ruta" => $ruta
], 501);
