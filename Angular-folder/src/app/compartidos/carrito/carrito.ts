import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaz/productoInterfaz';
import { CarritoService } from '../../servicios/carrito';
import { PedidosADMI } from '../../servicios/pedidos-admi';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {

  productosCarrito: Producto[] = [];

  constructor(
    private carrito: CarritoService,
    private pedidosAdmi: PedidosADMI
  ) {}

  ngOnInit() {
    this.productosCarrito = this.carrito.obtenerCarrito();
  }
  
  get pesoTotal(): number {
    return this.productosCarrito.reduce(
      (total, producto) => total + producto.peso * (producto.cantidad ?? 1),
      0,
    );
  }

  get subtotal(): number {
    return this.productosCarrito.reduce(
      (total, producto) => total + producto.precio * (producto.cantidad ?? 1),
      0,
    );
  }

  get descuento(): number {
    return this.pesoTotal > 3 ? this.subtotal * 0.1 : 0;
  }

  get precioTotal(): number {
    return this.subtotal - this.descuento;
  }
  
  eliminarDelCarrito(indice: number) {
    this.carrito.eliminarItemDelCarrito(indice);
    this.productosCarrito = this.carrito.obtenerCarrito();
  }

  realizarPedido() {
    const pedido = {
      nombre: 'Juan',
      apellido: 'Pérez',
      direccion: 'Av. Siempre Viva 123',
      productos: this.productosCarrito
    };

    this.pedidosAdmi.agregarPedido(pedido);

    this.carrito.vaciarCarrito();
    this.productosCarrito = [];
  }

}