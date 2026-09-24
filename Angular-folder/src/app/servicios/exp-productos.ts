import { Injectable } from '@angular/core';
import { Producto } from '../interfaz/productoInterfaz';

@Injectable({
  providedIn: 'root',
})
export class ExpProductos {
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Yerba Mate ojas 1kg',
      precio: 3450.0,
      imagen: 'assets/img/yerba.jpg',
    },
    {
      id: 2,
      nombre: 'Yerba Mate ojas 500g',
      precio: 1800.0,
      imagen: 'assets/img/yerba.jpg',
    },
  ]

   obtenerProductos() {
      return this.productos;
  }
}
