import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from '../interfaz/productoInterfaz';

export interface ItemCarrito {
  id: number;
  id_producto: number;
  nombre: string;
  imagen: string;
  precio: number;
  peso: number;
  cantidad: number;
  subtotal: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private url = 'http://localhost/api_proyecto/public/carrito';
  carrito: Producto[] = [];
  mensajeToast = signal('');

  constructor(private http: HttpClient) {}

  private mostrarMensaje(mensaje: string): void {
    this.mensajeToast.set(mensaje);
    window.setTimeout(() => {
      this.mensajeToast.set('');
    }, 2500);
  }

  obtenerCarrito(): Observable<ItemCarrito[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(items => items.map(i => ({
        ...i,
        id: +i.id,
        id_producto: +i.id_producto,
        precio: +i.precio,
        peso: +i.peso,
        cantidad: +i.cantidad,
        subtotal: +i.subtotal
      })))
    );
  }

  obtenerCarritoLocal(): Producto[] {
    return this.carrito;
  }

  agregar(idProducto: number, cantidad = 1) {
    return this.http.post(`${this.url}/agregar`, { id_producto: idProducto, cantidad });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carrito.push(producto);
    this.mostrarMensaje('Producto agregado al carrito');
  }

  actualizarCantidad(idProducto: number, cantidad: number) {
    return this.http.put(`${this.url}/actualizar/${idProducto}`, { cantidad });
  }

  eliminar(idProducto: number) {
    return this.http.delete(`${this.url}/eliminar/${idProducto}`);
  }

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

  vaciar() {
    return this.http.delete(`${this.url}/vaciar`);
  }

  vaciarCarrito(): void {
    this.carrito = [];
    this.mostrarMensaje('Carrito vaciado');
  }
}

