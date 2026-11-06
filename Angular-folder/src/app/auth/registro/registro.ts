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
    this.authService.registro({ nombre, mail, password, rol }).subscribe({
      error: (error: unknown) => {
        console.error('No se pudo registrar el usuario', error);
      },
    });
  }

  

}
