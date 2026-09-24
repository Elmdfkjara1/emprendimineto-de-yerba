
import { Injectable } from '@angular/core';
import { Producto } from '../interfaz/productoInterfaz';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {

  carrito: Producto[] = [];

  // READ - Obtener productos del carrito
  obtenerCarrito(): Producto[] {
    return this.carrito;
  }

  // CREATE - Agregar producto al carrito
  agregarAlCarrito(producto: Producto): void {
    this.carrito.push(producto);
  }

  // DELETE - Eliminar producto por ID
  eliminarDelCarrito(id: number): void {
    this.carrito = this.carrito.filter(producto => producto.id !== id);
  }

  // DELETE - Vaciar carrito
  vaciarCarrito(): void {
    this.carrito = [];
  }

}

