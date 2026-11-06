
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthService } from './auth';
import { CarritoService } from './carrito';

describe('CarritoService', () => {
  let service: CarritoService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: { getToken: () => 'token-de-prueba' } },
      ],
    });
    service = TestBed.inject(CarritoService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loads the authenticated cart and converts API values', () => {
    let resultado: unknown;
    service.obtenerCarrito().subscribe((items) => resultado = items);

    const request = http.expectOne('http://localhost/api_yerba/public/carrito');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-de-prueba');
    request.flush([{
      id: '2',
      id_producto: '4',
      nombre: 'Yerba 1kg',
      imagen: '',
      precio: '10000.00',
      peso: '1.00',
      cantidad: '2',
      subtotal: '20000.00',
    }]);

    expect(resultado).toEqual([{
      id: 2,
      id_producto: 4,
      nombre: 'Yerba 1kg',
      imagen: '',
      precio: 10000,
      peso: 1,
      cantidad: 2,
      subtotal: 20000,
    }]);
  });
});
