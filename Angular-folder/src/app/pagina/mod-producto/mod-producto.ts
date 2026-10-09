import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpProductos } from '../../servicios/exp-productos';
import { Producto } from '../../interfaz/productoInterfaz';

@Component({
  selector: 'app-modificar-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mod-producto.html',
  styleUrl: './mod-producto.css'
})
export class ModificarProducto {

  productos: Producto[] = [];

  // Datos para agregar un nuevo producto
  nuevoPeso: number = 1;
  nuevoPrecio: number = 0;

  // Producto que se está modificando
  productoEditando: Producto | null = null;
  precioEditado: number = 0;

  constructor(private expProductos: ExpProductos) {
    this.productos = this.expProductos.obtenerProductos();
  }

  // Comenzar a modificar un producto
  editarProducto(producto: Producto): void {
    this.productoEditando = producto;
    this.precioEditado = producto.precio;
  }

  // Guardar el nuevo precio
  guardarPrecio(): void {
    if (this.productoEditando && this.precioEditado > 0) {
      this.productoEditando.precio = this.precioEditado;
      this.productoEditando = null;
    }
  }

  // Cancelar modificación
  cancelarEdicion(): void {
    this.productoEditando = null;
  }

  // Agregar un nuevo tamaño
  agregarProducto(): void {

    if (this.nuevoPeso <= 0 || this.nuevoPrecio <= 0) {
      return;
    }

    const nuevoProducto: Producto = {
      id: this.generarNuevoId(),
      nombre: 'Yerba Mate Ojas ' + this.nuevoPeso + 'kg',
      precio: this.nuevoPrecio,
      imagen: 'assets/yerba2k.jpg',
      peso: this.nuevoPeso,
      cantidad: 1
    };

    this.expProductos.agregarProducto(nuevoProducto);

    this.productos = this.expProductos.obtenerProductos();

    this.nuevoPeso = 1;
    this.nuevoPrecio = 0;
  }

  // Eliminar producto
  eliminarProducto(id: number): void {
    this.expProductos.eliminarProducto(id);
    this.productos = this.expProductos.obtenerProductos();
  }

  // Generar un ID nuevo
  generarNuevoId(): number {
    if (this.productos.length === 0) {
      return 1;
    }

    return Math.max(...this.productos.map(producto => producto.id)) + 1;
  }
}