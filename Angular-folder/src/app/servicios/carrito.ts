import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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
  private url = 'http://localhost/api_proyecto/public/carrito'; // misma base que los otros servicios

  constructor(private http: HttpClient) {}

  obtenerCarrito(): Observable<ItemCarrito[]> {
    return this.http.get<any[]>(this.url).pipe(
      // PDO devuelve números como texto: los convertimos acá
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

  agregar(idProducto: number, cantidad = 1) {
    return this.http.post(`${this.url}/agregar`, { id_producto: idProducto, cantidad });
  }

  actualizarCantidad(idProducto: number, cantidad: number) {
    return this.http.put(`${this.url}/actualizar/${idProducto}`, { cantidad });
  }

  eliminar(idProducto: number) {
    return this.http.delete(`${this.url}/eliminar/${idProducto}`);
  }

  vaciar() {
    return this.http.delete(`${this.url}/vaciar`);
  }
}