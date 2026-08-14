
CREATE DATABASE emprendimiento_yerba;

use emprendimiento_yerba;
create table clientes(
    id_cliente int primary key auto_increment,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    dni int not null,
    telefono varchar(15) not null,  
    direccion varchar(100) not null,
    email varchar(50) not null,
    rol varchar(20) not null,
    contraseña VARCHAR(255)
)
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    precio DECIMAL(10,2),
    stock INT
);
--------------------------------------------------------------------------------------  
-- tablas hipoteticas en caso de venta de productos y pedidos de la pagina web
CREATE TABLE detalle_pedido (
    id int auto_increment primary key,
    id_pedido int not null,
    id_producto int not null,
    id_cliente int not null,
    cantidad int not null,
    nombre_producto varchar(50) not null
)
CREATE TABLE pedidos (
    id int auto_increment primary key,
    id_cliente int not null,
    fecha_pedido date not null,
    total decimal(10,2) not null
);
--------------------------------------------------------------------------------------