import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from '../interfaz/productoInterfaz';
import { AuthService } from './auth';

interface ItemCarritoApi {
  id: number | string;
  id_producto: number | string;
  nombre: string;
  imagen: string | null;
  precio: number | string;
  peso: number | string;
  cantidad: number | string;
  subtotal: number | string;
}

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

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private readonly apiUrl = 'http://localhost/api_yerba/public/carrito';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  obtenerCarrito(): Observable<ItemCarrito[]> {
    return this.http.get<ItemCarritoApi[]>(this.apiUrl, {
      headers: this.headers(),
    }).pipe(
      map((items) => items.map((item) => ({
        id: Number(item.id),
        id_producto: Number(item.id_producto),
        nombre: item.nombre,
        imagen: item.imagen ?? '',
        precio: Number(item.precio),
        peso: Number(item.peso),
        cantidad: Number(item.cantidad),
        subtotal: Number(item.subtotal),
      }))),
    );
  }

  agregarAlCarrito(producto: Producto): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/agregar`, {
      id_producto: producto.id,
      cantidad: producto.cantidad ?? 1,
    }, { headers: this.headers() });
  }

  actualizarCantidad(idProducto: number, cantidad: number): Observable<unknown> {
    return this.http.put(
      `${this.apiUrl}/actualizar/${idProducto}`,
      { cantidad },
      { headers: this.headers() },
    );
  }

  eliminar(idProducto: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/eliminar/${idProducto}`, {
      headers: this.headers(),
    });
  }

  vaciar(): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/vaciar`, {
      headers: this.headers(),
    });
  }

  private headers(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }
}
