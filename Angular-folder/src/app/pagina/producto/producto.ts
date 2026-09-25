import { Component, Injectable } from '@angular/core';
import { CarritoService } from './../../servicios/carrito';
import { Producto } from '../../interfaz/productoInterfaz';
import { ExpProductos } from '../../servicios/exp-productos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
@Injectable({
  providedIn: 'root',
})
export class Productos {
  productos: Producto[];
  producto: Producto;
  cantidad = 1;

  constructor(
    private carrito: CarritoService,
    private expProductos: ExpProductos,
  ) {
    this.productos = this.expProductos.obtenerProductos();
    this.producto = this.productos[0];
  }

  obtenerProductos(){
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