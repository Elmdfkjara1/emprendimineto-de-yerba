
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthService } from '../../servicios/auth';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let autenticado: boolean;
  let cerrarSesion: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    autenticado = false;
    cerrarSesion = vi.fn(() => {
      autenticado = false;
    });
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([{ path: 'inicio', component: Navbar }]),
        {
          provide: AuthService,
          useValue: {
            estaLogueado: () => autenticado,
            logout: cerrarSesion,
          },
        },
      ],
    }).compileComponents();
  });

  function crearNavbar(): void {
    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    crearNavbar();
    expect(component).toBeTruthy();
  });

  it('shows the logout button instead of the login link when signed in', () => {
    autenticado = true;
    crearNavbar();

    const boton = fixture.nativeElement.querySelector('.btn-sesion');
    expect(boton.textContent).toContain('Cerrar sesión');
    expect(boton.tagName).toBe('BUTTON');
    expect(fixture.nativeElement.querySelector('a.btn-sesion')).toBeNull();
  });

  it('logs out and shows the login link after clicking logout', () => {
    autenticado = true;
    crearNavbar();

    fixture.nativeElement.querySelector('button.btn-sesion').click();
    fixture.detectChanges();

    expect(cerrarSesion).toHaveBeenCalledOnce();
    expect(fixture.nativeElement.querySelector('button.btn-sesion')).toBeNull();
    expect(fixture.nativeElement.querySelector('a.btn-sesion')).not.toBeNull();
  });

  it('shows the login link when no session is active', () => {
    crearNavbar();
    expect(fixture.nativeElement.querySelector('.btn-sesion')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('button.btn-sesion')).toBeNull();
  });
});
