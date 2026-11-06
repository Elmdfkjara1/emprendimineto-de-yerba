
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerPedidos } from './pedidos-admi';
import { provideRouter } from '@angular/router';
import { PedidosADMI } from '../../servicios/pedidos-admi';
import { of } from 'rxjs';

describe('VerPedidos', () => {
  let component: VerPedidos;
  let fixture: ComponentFixture<VerPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPedidos],
        providers: [
          provideRouter([]),
          { provide: PedidosADMI, useValue: { obtenerPedidos: () => of([]) } },
        ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerPedidos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});