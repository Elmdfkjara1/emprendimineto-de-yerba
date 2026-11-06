import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService, ItemCarrito } from '../../servicios/carrito';
import { PedidosADMI } from '../../servicios/pedidos-admi';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {

  productosCarrito: ItemCarrito[] = [];
  pedido: { id_pedido: number; total: number } | null = null;
  whatsappUrl = '';
  private urlImagenes = 'http://localhost/api_yerba/public/uploads/';

  constructor(
    private carrito: CarritoService,
    private pedidosAdmi: PedidosADMI,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.carrito.obtenerCarrito().subscribe({
      next: items => this.productosCarrito = items,
      error: err => this.manejarError(err)
    });
  }

  urlImagen(p: ItemCarrito): string {
    return this.urlImagenes + p.imagen;
  }

  get pesoTotal(): number {
    return this.productosCarrito.reduce((t, p) => t + p.peso * p.cantidad, 0);
  }

  get subtotal(): number {
    return this.productosCarrito.reduce((t, p) => t + p.precio * p.cantidad, 0);
  }

  get descuento(): number {
    return this.pesoTotal >= 3 ? this.subtotal * 0.1 : 0;
  }

  get precioTotal(): number {
    return this.subtotal - this.descuento;
  }

  aumentarCantidad(p: ItemCarrito) {
    this.carrito.actualizarCantidad(p.id_producto, p.cantidad + 1)
      .subscribe(() => this.cargar());
  }

  disminuirCantidad(p: ItemCarrito) {
    if (p.cantidad <= 1) return;
    this.carrito.actualizarCantidad(p.id_producto, p.cantidad - 1)
      .subscribe(() => this.cargar());
  }

  eliminarDelCarrito(p: ItemCarrito) {
    this.carrito.eliminar(p.id_producto).subscribe(() => this.cargar());
  }

  vaciarCarrito() {
    this.carrito.vaciar().subscribe(() => this.cargar());
  }

  realizarCompra() {
    this.pedidosAdmi.finalizarCompra().subscribe({
      next: res => {
        this.pedido = res;
        this.productosCarrito = []; // el servidor ya vació el carrito
        const msg = `Hola, hice el pedido #${res.id_pedido} por $${res.total}. Te envío el comprobante.`;
        this.whatsappUrl = `https://wa.me/549XXXXXXXXXX?text=${encodeURIComponent(msg)}`;
      },
      error: err => this.manejarError(err)
    });
  }

  private manejarError(err: any) {
    if (err.status === 401) {
      alert('Debés iniciar sesión para comprar');
      this.router.navigate(['/inicioSesion']);
    } else {
      alert(err.error?.error ?? 'Ocurrió un error');
    }
  }
}