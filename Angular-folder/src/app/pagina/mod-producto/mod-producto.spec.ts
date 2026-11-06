
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarProducto } from './mod-producto';
import { ProductosApi } from '../../servicios/productos-api';
import { Producto } from '../../interfaz/productoInterfaz';
import { of } from 'rxjs';

describe('ModificarProducto', () => {
  let component: ModificarProducto;
  let fixture: ComponentFixture<ModificarProducto>;
  let listar: ReturnType<typeof vi.fn>;
  let crear: ReturnType<typeof vi.fn>;
  let actualizar: ReturnType<typeof vi.fn>;
  let eliminar: ReturnType<typeof vi.fn>;
  const productos: Producto[] = [{
    id: 4,
    nombre: 'Yerba 1kg',
    precio: 10000,
    stock: 10,
    imagen: 'assets/yerba2k.jpg',
    peso: 1,
    cantidadKilos: 1,
  }];

  beforeEach(async () => {
    listar = vi.fn(() => of(productos));
    crear = vi.fn(() => of({ mensaje: 'Producto creado' }));
    actualizar = vi.fn(() => of({ mensaje: 'Producto actualizado' }));
    eliminar = vi.fn(() => of({ mensaje: 'Producto eliminado' }));
    await TestBed.configureTestingModule({
      imports: [ModificarProducto],
      providers: [{
        provide: ProductosApi,
        useValue: { listar, crear, actualizar, eliminar },
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the product list from the API', () => {
    expect(listar).toHaveBeenCalledOnce();
    expect(component.productos).toEqual(productos);
  });

  it('creates a product in the API and refreshes the displayed list', () => {
    component.nuevoPeso = 3;
    component.nuevoPrecio = 30000;
    component.agregarProducto();

    expect(crear).toHaveBeenCalledWith({
      nombre: 'Yerba Mate Ojas 3kg',
      precio: 30000,
      stock: 10,
      imagen: 'assets/yerba2k.jpg',
      peso: 3,
      cantidadKilos: 1,
    });
    expect(listar).toHaveBeenCalledTimes(2);
    expect(component.mensaje).toBe('Producto agregado correctamente.');
    expect(component.nuevoPeso).toBe(1);
    expect(component.nuevoPrecio).toBe(0);
  });

  it('updates the selected product through the API and refreshes the list', () => {
    component.editarProducto(productos[0]);
    component.precioEditado = 12000;
    component.guardarPrecio();

    expect(actualizar).toHaveBeenCalledWith(4, {
      nombre: 'Yerba 1kg',
      precio: 12000,
      stock: 10,
      imagen: 'assets/yerba2k.jpg',
      peso: 1,
      cantidadKilos: 1,
    });
    expect(listar).toHaveBeenCalledTimes(2);
    expect(component.productoEditando).toBeNull();
  });

  it('deletes a product through the API after confirmation', () => {
    vi.stubGlobal('confirm', vi.fn(() => true));

    component.eliminarProducto(4);

    expect(eliminar).toHaveBeenCalledWith(4);
    expect(listar).toHaveBeenCalledTimes(2);
    vi.unstubAllGlobals();
  });
});
