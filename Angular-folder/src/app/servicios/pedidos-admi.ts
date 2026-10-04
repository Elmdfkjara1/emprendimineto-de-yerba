import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosADMI {

  pedidos = [
    {
      nombre: 'Juan',
      apellido: 'Pérez',
      direccion: 'Av. Siempre Viva 123',
      productos: [
        {
          nombre: 'Yerba Mate Ojas 1kg',
          cantidad: 2,
          precio: 10000
        }
      ]
    },
    {
      nombre: 'Ana',
      apellido: 'Gómez',
      direccion: 'Calle Mitre 456',
      productos: [
        {
          nombre: 'Yerba Mate Ojas 2kg',
          cantidad: 1,
          precio: 20000
        }
      ]
    }
  ];

  obtenerPedidos() {
    return this.pedidos;
  }
  agregarPedido(pedido: any) {
    this.pedidos.push(pedido);
  }
}