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

  it('removes one product row and removes its order when no products remain', () => {
    const pedido = {
      nombre: 'Comprador',
      apellido: 'Prueba',
      direccion: 'Dirección',
      productos: [
        { nombre: 'Yerba 1kg', cantidad: 1, precio: 10000 },
        { nombre: 'Yerba 2kg', cantidad: 1, precio: 20000 },
      ],
    };
    service.pedidos = [pedido];

    service.eliminarProductoPedido(0, 0);
    expect(service.obtenerPedidos()).toEqual([{ ...pedido, productos: [pedido.productos[0]] }]);

    service.eliminarProductoPedido(0, 0);
    expect(service.obtenerPedidos()).toEqual([]);
  });
});
