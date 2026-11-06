// Importa inject, que permite obtener servicios de Angular
// sin tener que declararlos en un constructor.
import { inject } from "@angular/core";

// Importa CanActivateFn, que permite crear una función
// para controlar si se puede acceder a una ruta, y Router,
// que permite navegar entre las páginas de la aplicación.
import { CanActivateFn, Router } from "@angular/router";

// Importa AuthService, que permite comprobar si el usuario
// inició sesión y si tiene el rol de administrador.
import { AuthService } from "../servicios/auth";

// Crea y exporta el guard llamado adminGuard.
// CanActivateFn indica que esta función se utilizará
// para decidir si se permite el acceso a una ruta.
export const adminGuard: CanActivateFn = () => {
  // Obtiene el servicio de autenticación.
  const auth = inject(AuthService);

  // Obtiene el servicio que permite navegar entre rutas.
  const router = inject(Router);

  // Comprueba dos condiciones:
  // 1. Que el usuario haya iniciado sesión.
  // 2. Que el usuario tenga el rol de administrador.
  if (auth.estaLogueado() && auth.esAdmin()) {
    // Si se cumplen ambas condiciones, permite el acceso a la ruta.
    return true;
  }

  // Si alguna condición no se cumple, redirige al usuario
  // a la página de inicio.
  router.navigate(["/inicio"]);

  // Cancela el acceso a la ruta protegida.
  return false;
};