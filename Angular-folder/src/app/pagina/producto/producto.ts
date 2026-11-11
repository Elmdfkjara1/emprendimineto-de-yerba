import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from './../../servicios/carrito';
import { Producto } from '../../interfaz/productoInterfaz';
import { ExpProductos } from '../../servicios/exp-productos';

@Component({
  selector: 'app-producto',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Productos {
  productos: Producto[];
  producto: Producto;
  cantidad = 1;

  constructor(
    private carrito: CarritoService,
    private expProductos: ExpProductos,
    private router: Router,
  ) {
    this.productos = this.expProductos.obtenerProductos();
    this.producto = this.productos[0];
  }

  mensajeToast(): string {
    return this.carrito.mensajeToast();
  }

  limpiarToast(): void {
    this.carrito.mensajeToast.set('');
  }

  obtenerProductos() {
    const productos = this.expProductos.obtenerProductos();
    return productos;
  }

  agregarAlCarrito(producto: Producto) {
    this.carrito.agregarAlCarrito({ ...producto, cantidad: this.cantidad });
  }

  disminuirCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  aumentarCantidad(): void {
    this.cantidad++;
  }

  seleccionarProducto(id: number): void {
    const productoSeleccionado = this.productos.find(producto => producto.id === id);

      if (productoSeleccionado) {
        this.producto = productoSeleccionado;
        this.cantidad = 1;
      }
    }

}