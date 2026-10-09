import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModProducto } from './mod-producto';

describe('ModProducto', () => {
  let component: ModProducto;
  let fixture: ComponentFixture<ModProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModProducto],
    }).compileComponents();

    fixture = TestBed.createComponent(ModProducto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
