import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from "../../servicios/auth";



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuAbierto = false;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  cerrarSesion(): void {
    this.authService.logout();
    this.menuAbierto = false;
    this.router.navigate(['/inicio']);
  }
}
