import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
 constructor(
private authService: AuthService
 ) {}
  

 agregarUsuario(nombre: string, mail: string, password: string, rol: string): void {

  if (!nombre || !mail || !password || !rol) {
    console.log('Todos los campos son obligatorios');
    return;
  }
    const nuevoUsuario = {
      id: this.authService.obtenerUsuario().length + 1,
      nombre: nombre,
      mail: mail, 
      password: password,
      admin: true
    };
    this.authService.agregarUsuario(nuevoUsuario);
  }

  

}
