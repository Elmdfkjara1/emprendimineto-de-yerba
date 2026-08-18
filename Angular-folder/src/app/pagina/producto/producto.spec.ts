import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Producto } from './producto';

describe('Producto', () => {
  let component: Producto;
  let fixture: ComponentFixture<Producto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Producto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Producto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
