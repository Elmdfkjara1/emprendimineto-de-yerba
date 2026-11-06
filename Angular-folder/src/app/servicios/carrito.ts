// Importa Injectable, que permite que Angular utilice esta clase como servicio.
import { Injectable } from "@angular/core";

// Importa HttpClient para enviar peticiones HTTP al backend
// y HttpHeaders para configurar las cabeceras de esas peticiones.
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Importa Observable, que representa una operación cuyo resultado
// se recibirá de forma asíncrona.
import { Observable } from "rxjs";
import { Producto } from "../interfaz/productoInterfaz";

// Importa AuthService para poder recuperar el token del usuario
// que inició sesión.
import { AuthService } from "./auth";

// Indica que el servicio estará disponible en toda la aplicación.
@Injectable({
  providedIn: "root"
})
export class CarritoService {

  private carrito: Producto[] = [];

  // Guarda la dirección base del endpoint del carrito en la API REST.
  private apiUrl = "http://localhost/api_yerba/public/carrito";

  // Inyecta HttpClient para comunicarse con el backend
  // y AuthService para obtener el token de autenticación.
  constructor(private http: HttpClient, private auth: AuthService) {}

  obtenerCarrito(): Producto[] {
    return this.carrito;
  }

  agregarAlCarrito(producto: Producto): void {
    const existente = this.carrito.find(item => item.id === producto.id);
    if (existente) {
      existente.cantidad = (existente.cantidad ?? 1) + (producto.cantidad ?? 1);
      return;
    }

    this.carrito.push({ ...producto, cantidad: producto.cantidad ?? 1 });
  }

  eliminarItemDelCarrito(indice: number): void {
    this.carrito.splice(indice, 1);
  }

  aumentarCantidad(id: number): void {
    const producto = this.carrito.find(item => item.id === id);
    if (producto) {
      producto.cantidad = (producto.cantidad ?? 1) + 1;
    }
  }

  disminuirCantidad(id: number): void {
    const producto = this.carrito.find(item => item.id === id);
    if (producto && (producto.cantidad ?? 1) > 1) {
      producto.cantidad = (producto.cantidad ?? 1) - 1;
    }
  }

  vaciarCarrito(): void {
    this.carrito = [];
  }

  // Crea y devuelve las cabeceras HTTP que se utilizarán
  // para enviar el token de autenticación al backend.
  private headers(): HttpHeaders {
    // Crea una cabecera llamada Authorization.
    // Bearer indica que el valor enviado es un token de autenticación.
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  // Solicita al backend los productos que están en el carrito.
  // Devuelve un Observable con la respuesta de la API.
  ver(): Observable<any> {
    // Envía una petición GET a la dirección del carrito.
    // Incluye las cabeceras con el token para identificar al usuario.
    return this.http.get(this.apiUrl, { headers: this.headers() });
  }

  // Solicita agregar un producto al carrito.
  // Recibe el ID del producto y la cantidad que se desea agregar.
  agregar(idProducto: number, cantidad: number): Observable<any> {
    // Envía una petición POST al endpoint /agregar.
    // En el cuerpo envía el ID del producto y la cantidad.
    // También incluye el token de autenticación en las cabeceras.
    return this.http.post(
      `${this.apiUrl}/agregar`,
      { id_producto: idProducto, cantidad },
      { headers: this.headers() }
    );
  }

  // Solicita eliminar un producto específico del carrito.
  // Recibe como parámetro el ID del producto.
  eliminar(idProducto: number): Observable<any> {
    // Envía una petición DELETE al endpoint /eliminar/
    // seguido del ID del producto que se desea eliminar.
    // Incluye las cabeceras con el token de autenticación.
    return this.http.delete(
      `${this.apiUrl}/eliminar/${idProducto}`,
      { headers: this.headers() }
    );
  }

  // Solicita vaciar el carrito completo.
  vaciar(): Observable<any> {
    // Envía una petición DELETE al endpoint /vaciar.
    // Incluye el token para que el backend pueda identificar
    // al usuario cuyo carrito se quiere vaciar.
    return this.http.delete(
      `${this.apiUrl}/vaciar`,
      { headers: this.headers() }
    );
  }
} 