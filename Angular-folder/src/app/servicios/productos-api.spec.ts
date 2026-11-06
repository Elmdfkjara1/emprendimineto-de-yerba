import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthService } from './auth';
import { ProductosApi } from './productos-api';

describe('ProductosApi', () => {
  let service: ProductosApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: { getToken: () => 'admin-token' } },
      ],
    });
    service = TestBed.inject(ProductosApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads database products and converts API fields to the app model', () => {
    let resultado: unknown;
    service.listar().subscribe((productos) => {
      resultado = productos;
    });

    const request = http.expectOne('http://localhost/api_yerba/public/productos');
    expect(request.request.method).toBe('GET');
    request.flush([
      {
        id: '12',
        nombre: 'Yerba de la base',
        precio: '15000.50',
        stock: '6',
        imagen: 'yerba.png',
        peso: '2',
      },
    ]);

    expect(resultado).toEqual([
      {
        id: 12,
        nombre: 'Yerba de la base',
        precio: 15000.5,
        stock: 6,
        imagen: 'http://localhost/api_yerba/public/uploads/yerba.png',
        peso: 2,
        cantidad: 1,
        cantidadKilos: 1,
      },
    ]);
  });

  it('sends authenticated create, update and delete requests', () => {
    const producto = {
      nombre: 'Yerba nueva',
      precio: 12000,
      stock: 10,
      imagen: 'assets/yerba2k.jpg',
      peso: 1,
      cantidadKilos: 1,
    };

    service.crear(producto).subscribe();
    const createRequest = http.expectOne('http://localhost/api_yerba/public/productos');
    expect(createRequest.request.method).toBe('POST');
    expect(createRequest.request.headers.get('Authorization')).toBe('Bearer admin-token');
    createRequest.flush({ mensaje: 'Producto creado' });

    service.actualizar(4, producto).subscribe();
    const updateRequest = http.expectOne('http://localhost/api_yerba/public/productos/4');
    expect(updateRequest.request.method).toBe('PUT');
    expect(updateRequest.request.headers.get('Authorization')).toBe('Bearer admin-token');
    updateRequest.flush({ mensaje: 'Producto actualizado' });

    service.eliminar(4).subscribe();
    const deleteRequest = http.expectOne('http://localhost/api_yerba/public/productos/4');
    expect(deleteRequest.request.method).toBe('DELETE');
    expect(deleteRequest.request.headers.get('Authorization')).toBe('Bearer admin-token');
    deleteRequest.flush({ mensaje: 'Producto eliminado' });
  });
});
