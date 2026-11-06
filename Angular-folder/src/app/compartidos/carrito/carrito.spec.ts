import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carrito } from './carrito';
import { provideRouter } from '@angular/router';
import { CarritoService } from '../../servicios/carrito';
import { PedidosADMI } from '../../servicios/pedidos-admi';
import { of } from 'rxjs';

describe('Carrito', () => {
  let component: Carrito;
  let fixture: ComponentFixture<Carrito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carrito],
      providers: [
        provideRouter([]),
        {
          provide: CarritoService,
          useValue: {
            obtenerCarrito: () => of([]),
            vaciar: () => of({}),
          },
        },
        {
          provide: PedidosADMI,
          useValue: { finalizarCompra: () => of({}) },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carrito);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
