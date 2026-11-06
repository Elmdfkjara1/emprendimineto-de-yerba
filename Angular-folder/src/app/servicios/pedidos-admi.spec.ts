import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthService } from './auth';
import { PedidosADMI } from './pedidos-admi';

describe('PedidosADMI', () => {
  let service: PedidosADMI;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: { getToken: () => 'token-de-prueba' } },
      ],
    });
    service = TestBed.inject(PedidosADMI);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loads all orders with the authentication token', () => {
    let resultado: unknown;
    service.obtenerPedidos().subscribe((pedidos) => resultado = pedidos);

    const request = http.expectOne('http://localhost/api_yerba/public/compras/todas');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-de-prueba');
    request.flush([]);

    expect(resultado).toEqual([]);
  });
});
