import { Component, Injectable } from '@angular/core';
import { CarritoService } from './../../servicios/carrito';
import { Producto } from '../../interfaz/productoInterfaz';
import { ExpProductos } from '../../servicios/exp-productos';

@Component({
  selector: 'app-producto',
  imports: [],
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
      this.carrito.agregarAlCarrito(producto);
    }

    seleccionarProducto(id: number): void {
      const productoSeleccionado = this.productos.find(producto => producto.id === id);

      if (productoSeleccionado) {
        this.producto = productoSeleccionado;
      }
    }

}