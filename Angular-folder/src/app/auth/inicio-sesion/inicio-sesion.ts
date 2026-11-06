// Importa Component, que permite definir un componente de Angular.
import { Component } from "@angular/core";

// Importa CommonModule por si usas directivas comunes (opcional pero recomendado)
import { CommonModule } from "@angular/common";

// Importa FormsModule para poder usar ngModel en el formulario HTML.
import { FormsModule } from "@angular/forms";

// Importa AuthService, que contiene el método para iniciar sesión
// y comunicarse con la API REST en PHP.
import { AuthService } from "../../servicios/auth";

// Importa Router, que permite navegar entre las páginas
// de la aplicación sin tener que recargarla.
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

// Define las características principales del componente.
@Component({
  selector: "app-inicio-sesion",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./inicio-sesion.html",
  styleUrl: "./inicio-sesion.css"
})
export class InicioSesion {
  // Almacena el correo electrónico ingresado en el formulario.
  email = "";

  // Almacena la contraseña ingresada por el usuario.
  password = "";

  // Almacena el mensaje de error que se mostrará si el inicio de sesión falla.
  error = "";

  // Inyecta AuthService para realizar el inicio de sesión
  // y Router para navegar después de recibir la respuesta.
  constructor(private auth: AuthService, private router: Router) {}

  // Método que se ejecuta cuando el usuario intenta ingresar.
  ingresar(): void {
    this.error = "";

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(["/inicio"]);
        alert("Inicio de sesión exitoso");
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.status === 0
          ? "No se pudo conectar con el servidor. Verifica que la API esté activa."
          : error.status === 401
            ? "Email o contraseña incorrectos."
            : "No se pudo iniciar sesión. Intenta nuevamente.";
      }
    });
  }
}