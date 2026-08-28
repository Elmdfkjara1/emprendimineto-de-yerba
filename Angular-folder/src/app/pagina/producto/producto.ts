  import { Component, Injectable } from '@angular/core';
import { Producto } from './../../interfaz/producto';
import { Carrito } from './../../servicios/carrito';

@Component({
  selector: 'app-producto',
  imports: [ Carrito ],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
@Injectable({
  providedIn: 'root',
})
export class Productos {
  producto: Producto[] = [
    {
      id: 2,
      nombre: 'Yerba Mate ojas 1kg',
      precio: 3450.0,
      stock: 25,
      imagen: 'assets/img/yerba.jpg',
    },
    {
      id: 3,
      nombre: 'Yerba Mate ojas 500g',
      precio: 1800.0,
      stock: 60,
      imagen: 'assets/img/yerba.jpg',
    },
  ];
  static id: any;

  constructor(private carrito: Carrito) {}

  AgregarCarrito(producto: Producto) {
    this.carrito.agregarAlCarrito(producto);
  }
}