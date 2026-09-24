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
  
  eliminarDelCarrito(id: number) {
    this.carrito.eliminarDelCarrito(id);
    this.productosCarrito = this.carrito.obtenerCarrito();
  }



}
