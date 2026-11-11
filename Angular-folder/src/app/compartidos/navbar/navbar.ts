import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  menuAbierto = false;

  constructor(
    public authService: AuthService
  ) {}

  // Comprueba si el usuario es administrador
  get esAdmin(): boolean {
    return this.authService.usuarioActual?.admin === true;
  }

}