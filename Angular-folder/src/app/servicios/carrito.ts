
import { Injectable } from '@angular/core';
import { Producto } from '../interfaz/productoInterfaz';

@Injectable({
  providedIn: 'root',
})
export class Carrito {

  array: Producto[] = [];

  // READ - Obtener productos del carrito
  obtenerCarrito(): Producto[] {
    return this.array;
  }

  // CREATE - Agregar producto al carrito
  agregarAlCarrito(producto: Producto): void {
    this.array.push(producto);
  }

  // DELETE - Eliminar producto por ID
  eliminarDelCarrito(id: number): void {
    this.array = this.array.filter(producto => producto.id !== id);
  }

  // DELETE - Vaciar carrito
  vaciarCarrito(): void {
    this.array = [];
  }

}

