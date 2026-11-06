import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CarritoService } from '../../servicios/carrito';
import { ProductosApi } from '../../servicios/productos-api';
import { Producto } from '../../interfaz/productoInterfaz';
import { Productos } from './producto';

describe('Productos', () => {
  let component: Productos;
  let fixture: ComponentFixture<Productos>;
  let listar: ReturnType<typeof vi.fn>;
  const productos: Producto[] = [
    {
      id: 8,
      nombre: 'Yerba de prueba',
      precio: 12500,
      stock: 5,
      imagen: 'assets/yerba2k.jpg',
      peso: 1,
    },
  ];

  beforeEach(async () => {
    listar = vi.fn(() => of(productos));
    await TestBed.configureTestingModule({
      imports: [Productos],
      providers: [
        provideRouter([]),
        { provide: ProductosApi, useValue: { listar } },
        { provide: CarritoService, useValue: { agregarAlCarrito: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Productos);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads products from the API and lets the user select them', () => {
    fixture.detectChanges();

    expect(listar).toHaveBeenCalledOnce();
    expect(component.productos).toEqual(productos);
    expect(component.producto).toEqual(productos[0]);
    expect(fixture.nativeElement.textContent).toContain('Yerba de prueba');
  });

  it('shows an empty state when the database has no products', () => {
    listar.mockReturnValue(of([]));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No hay productos disponibles');
  });

  it('shows a retry option when products cannot be loaded', () => {
    listar.mockReturnValue(throwError(() => new Error('API unavailable')));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No se pudieron cargar los productos');
    expect(fixture.nativeElement.textContent).toContain('Reintentar');
  });
});