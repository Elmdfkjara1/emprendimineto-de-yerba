import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosAdmi } from './pedidos-admi';

describe('PedidosAdmi', () => {
  let component: PedidosAdmi;
  let fixture: ComponentFixture<PedidosAdmi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosAdmi],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosAdmi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
