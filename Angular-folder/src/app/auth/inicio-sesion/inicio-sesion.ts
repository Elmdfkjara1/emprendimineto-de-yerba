
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth';

@Component({
  selector: 'app-inicio-sesion',
  imports: [RouterLink, FormsModule],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService
  ) {}

  confirmarUsuario(mail: string, password: string): void {
    if (!mail || !password) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    const usuario = this.authService.obtenerUsuario().find(
      usuario => usuario.mail === mail &&
                 usuario.password === password
    );

    if (usuario) {
      console.log('Inicio de sesión exitoso');
    } else {
      console.log('Credenciales inválidas');
    }
  }
}
