import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaz/productoInterfaz';
import { CarritoService } from '../../servicios/carrito';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {
 productosCarrito: Producto[] = [];

  constructor(
    private carrito: CarritoService
  ) {}
  ngOnInit() {
    this.productosCarrito = this.carrito.obtenerCarrito();
  }
  
  get precioTotal(): number {
    return this.productosCarrito.reduce(
      (total, producto) => total + producto.precio * (producto.cantidad ?? 1),
      0,
    );
  }
  
  eliminarDelCarrito(indice: number) {
    this.carrito.eliminarItemDelCarrito(indice);
    this.productosCarrito = this.carrito.obtenerCarrito();
  }

  

  

}
