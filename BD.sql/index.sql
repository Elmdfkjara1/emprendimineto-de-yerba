
CREATE DATABASE emprendimiento_yerba;

use emprendimiento_yerba;
create table usuarios(
    id_usuario int primary key auto_increment,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    dni int not null,
    telefono varchar(15) not null,  
    direccion varchar(100) not null,
    email varchar(50) not null,
    rol boolean not null,
    contraseña VARCHAR(255)
);
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    precio DECIMAL(10,2),
    stock INT,
    imagen VARCHAR(255),
    peso DECIMAL(10,2),
    cantidadKilos INT
);
--------------------------------------------------------------------------------------  
-- tablas hipoteticas en caso de venta de productos y pedidos de la pagina web
CREATE TABLE detalle_pedido (
    id int auto_increment primary key,
    id_pedido int not null,
    id_producto int not null,
    id_usuario int not null,
    cantidad int not null,
    nombre_producto varchar(50) not null
);
CREATE TABLE pedidos (
    id int auto_increment primary key,
    id_usuario int not null,
    fecha_pedido date not null,
    total decimal(10,2) not null
);


CREATE TABLE carrito (
    id int auto_increment primary key,
    id_usuario int not null,
    id_producto int not null,
    cantidad int not null,
    estado ENUM('abierto', 'cerrado') NOT NULL DEFAULT 'abierto'
);

CREATE TABLE detalle_carrito (
    id int auto_increment primary key,
    id_carrito int not null,
    id_producto int not null,
    cantidad int not null,
    precio_unitario decimal(10,2) 
); --------------------------------------------------------------------------------


