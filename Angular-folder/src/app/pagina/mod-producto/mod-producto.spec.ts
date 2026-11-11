
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarProducto } from './mod-producto';
import { ExpProductos } from '../../servicios/exp-productos';
import { provideRouter } from '@angular/router';

describe('ModificarProducto', () => {
  let component: ModificarProducto;
  let fixture: ComponentFixture<ModificarProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarProducto],
      providers: [ExpProductos,provideRouter([])],
     
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarProducto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
