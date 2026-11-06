// Importa el decorador Injectable, que permite que Angular
// pueda utilizar esta clase como un servicio.
import { Injectable } from '@angular/core';

// Importa HttpClient, que permite realizar peticiones HTTP
// al backend desarrollado en PHP.
import { HttpClient } from '@angular/common/http';

// Importa Observable, que representa una operación que puede
// devolver una respuesta más adelante, y tap, que permite
// ejecutar acciones cuando llega esa respuesta.
import { Observable, tap } from 'rxjs';

// Indica que Angular puede crear este servicio automáticamente
// y que estará disponible en toda la aplicación.
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Guarda la dirección base de los endpoints de usuarios
  // de nuestra API REST desarrollada en PHP.
  private apiUrl = 'http://localhost/api_yerba/public/usuarios';

  // Inyecta HttpClient para poder enviar peticiones al backend.
  constructor(private http: HttpClient) {}

  // Registra un usuario nuevo.
  // Recibe un objeto datos con la información del formulario.
  // Observable<any> indica que la respuesta llegará de forma
  // asíncrona y que su estructura no está definida aquí.
  registro(datos: any): Observable<any> {
    // Envía una petición POST a la dirección /registro
    // y envía los datos del nuevo usuario en el cuerpo.
    return this.http.post(`${this.apiUrl}/registro`, datos);
  }

  // Inicia sesión con el correo electrónico y la contraseña.
  // Devuelve un Observable con la respuesta del servidor.
  login(email: string, contraseña: string): Observable<any> {
    // Envía una petición POST al endpoint /login.
    // El correo y la contraseña se envían en el cuerpo
    // de la petición como un objeto.
    return this.http.post(`${this.apiUrl}/login`, { email, contraseña }).pipe(
      // tap permite realizar acciones adicionales cuando
      // llega la respuesta, sin modificarla.
      tap((respuesta: any) => {
        // Guarda el token que devuelve el servidor.
        // Luego se puede utilizar para autenticar otras peticiones.
        localStorage.setItem('token', respuesta.token);

        // Convierte los datos del usuario a texto JSON
        // y los guarda en el almacenamiento local del navegador.
        localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
      })
    );
  }

  // Cierra la sesión eliminando los datos guardados
  // en el almacenamiento local del navegador.
  logout(): void {
    // Elimina el token de autenticación.
    localStorage.removeItem('token');
    // Elimina los datos del usuario.
    localStorage.removeItem('usuario');
  }

  // Obtiene el token que está guardado en el navegador.
  // Si no existe, devuelve null.
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getNombre(): string {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      return '';
    }

    try {
      const datos: unknown = JSON.parse(usuario);
      if (
        typeof datos === 'object' &&
        datos !== null &&
        'nombre' in datos &&
        typeof datos.nombre === 'string'
      ) {
        return datos.nombre;
      }
    } catch (error) {
      console.error('No se pudieron leer los datos del usuario guardados', error);
    }

    return '';
  }

  // Comprueba si hay un token guardado.
  // Si existe, devuelve true; de lo contrario, false.
  estaLogueado(): boolean {
    return Boolean(this.getToken());
  }

  // Comprueba si el usuario guardado tiene el rol de administrador.
  esAdmin(): boolean {
    // Recupera los datos del usuario guardados como texto.
    // Si no hay datos, utiliza un objeto vacío.
    // JSON.parse convierte el texto JSON nuevamente en un objeto.
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    // Devuelve true si el rol es 'admin', de lo contrario false.
    return usuario.rol === 'admin';
  }
}