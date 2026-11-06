import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Producto } from '../interfaz/productoInterfaz';
import { AuthService } from './auth';

interface ProductoApi {
  id: number | string;
  nombre: string;
  precio: number | string;
  stock: number | string;
  imagen: string | null;
  peso: number | string;
  cantidadKilos?: number | string;
}

export interface ProductoActualizacion {
  nombre: string;
  precio: number;
  stock: number;
  imagen: string;
  peso: number;
  cantidadKilos: number;
}

export type ProductoNuevo = ProductoActualizacion;

@Injectable({
  providedIn: 'root',
})
export class ProductosApi {
  private readonly apiUrl = 'http://localhost/api_yerba/public/productos';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  listar(): Observable<Producto[]> {
    return this.http.get<ProductoApi[]>(this.apiUrl).pipe(
      map((productos) =>
        productos.map((producto) => this.convertirProducto(producto)),
      ),
    );
  }

  crear(producto: ProductoNuevo): Observable<unknown> {
    return this.http.post(this.apiUrl, producto, {
      headers: this.headersAutenticacion(),
    });
  }

  actualizar(id: number, producto: ProductoActualizacion): Observable<unknown> {
    return this.http.put(`${this.apiUrl}/${id}`, producto, {
      headers: this.headersAutenticacion(),
    });
  }

  eliminar(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.headersAutenticacion(),
    });
  }

  private convertirProducto(producto: ProductoApi): Producto {
    return {
      id: Number(producto.id),
      nombre: producto.nombre,
      precio: Number(producto.precio),
      stock: Number(producto.stock),
      imagen: this.obtenerUrlImagen(producto.imagen),
      peso: Number(producto.peso),
      cantidad: 1,
      cantidadKilos: Number(producto.cantidadKilos ?? 1),
    };
  }

  private headersAutenticacion(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  private obtenerUrlImagen(imagen: string | null): string {
    if (!imagen) {
      return 'assets/yerba2k.jpg';
    }

    if (/^(https?:)?\/\//i.test(imagen) || imagen.startsWith('/') || imagen.startsWith('assets/')) {
      return imagen;
    }

    return `http://localhost/api_yerba/public/uploads/${encodeURIComponent(imagen)}`;
  }
}
