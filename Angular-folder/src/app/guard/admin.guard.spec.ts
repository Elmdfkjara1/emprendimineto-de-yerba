import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth';
import { adminGuard } from './admin.guard';

describe('adminGuard', () => {
  let autenticado: boolean;
  let administrador: boolean;
  let navegacionSolicitada: boolean;

  beforeEach(() => {
    autenticado = false;
    administrador = false;
    navegacionSolicitada = false;

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            estaLogueado: () => autenticado,
            esAdmin: () => administrador,
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {
              navegacionSolicitada = true;
              return Promise.resolve(true);
            },
          },
        },
      ],
    });
  });

  it('allows authenticated administrators', () => {
    autenticado = true;
    administrador = true;

    const resultado = TestBed.runInInjectionContext(() => adminGuard(null!, null!));

    expect(resultado).toBe(true);
    expect(navegacionSolicitada).toBe(false);
  });

  it('redirects users who are not administrators', () => {
    const resultado = TestBed.runInInjectionContext(() => adminGuard(null!, null!));

    expect(resultado).toBe(false);
    expect(navegacionSolicitada).toBe(true);
  });
});
