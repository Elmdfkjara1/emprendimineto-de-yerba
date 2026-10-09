import { TestBed } from '@angular/core/testing';

import { PedidosADMI } from './pedidos-admi';

describe('PedidosADMI', () => {
  let service: PedidosADMI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosADMI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
