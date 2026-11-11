
import { Injectable, signal } from '@angular/core';
import { Producto } from '../interfaz/productoInterfaz';



@Injectable({
  providedIn: 'root',
})
export class CarritoService {

  carrito: Producto[] = [];
  mensajeToast = signal('');

  private mostrarMensaje(mensaje: string): void {
    this.mensajeToast.set(mensaje);
    window.setTimeout(() => {
      this.mensajeToast.set('');
    }, 2500);
  }

  // READ - Obtener productos del carrito
  obtenerCarrito(): Producto[] {
    return this.carrito;
  }

  // CREATE - Agregar producto al carrito
  agregarAlCarrito(producto: Producto): void {
    this.carrito.push(producto);
    this.mostrarMensaje('Producto agregado al carrito');
  }

  // DELETE - Eliminar producto por ID
  eliminarDelCarrito(id: number): void {
    this.carrito = this.carrito.filter(producto => producto.id !== id);
    this.mostrarMensaje('Producto eliminado del carrito');
  }

  eliminarItemDelCarrito(indice: number): void {
    this.carrito.splice(indice, 1);
    this.mostrarMensaje('Producto eliminado del carrito');
  }

  aumentarCantidad(id: number): void {
    const producto = this.carrito.find(producto => producto.id === id);
    if (producto) {
      producto.cantidad = (producto.cantidad || 1) + 1;
    }
  }

  disminuirCantidad(id: number): void {
    const producto = this.carrito.find(producto => producto.id === id);
    if (producto && producto.cantidad && producto.cantidad > 1) {
      producto.cantidad -= 1;
    }
  }

  // DELETE - Vaciar carrito
  vaciarCarrito(): void {
    this.carrito = [];
    this.mostrarMensaje('Carrito vaciado');
  }

}

