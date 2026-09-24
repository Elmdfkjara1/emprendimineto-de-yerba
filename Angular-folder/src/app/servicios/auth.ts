import { Injectable } from '@angular/core';
import { Usuario } from '../interfaz/usuarioInterfaz';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuario: Usuario[] = [];

  obtenerUsuario(): Usuario[] {
    return this.usuario;
  }

  agregarUsuario(usuario: Usuario): void {
    const usuarioExistente = this.usuario.find((u) => u.mail === usuario.mail);
    if (!usuarioExistente) {
      this.usuario.push(usuario);
    } else {
      console.log('El usuario ya existe');
    }
  }

  iniciarSesion(mail: string, password: string): boolean {
    const usuario = this.usuario.find((u) => u.mail === mail && u.password === password);
    if (usuario) {
      console.log('Inicio de sesión exitoso');
      return true;
    } else {
      console.log('Credenciales inválidas');
      return false;
    } 
    
    
    
  }






}