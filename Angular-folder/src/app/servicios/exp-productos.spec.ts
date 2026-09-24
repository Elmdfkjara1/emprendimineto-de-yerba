import { TestBed } from '@angular/core/testing';

import { ExpProductos } from './exp-productos';

describe('ExpProductos', () => {
  let service: ExpProductos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpProductos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
