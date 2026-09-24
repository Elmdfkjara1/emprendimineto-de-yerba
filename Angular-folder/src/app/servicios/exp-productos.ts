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
      precio: 10000,
      imagen: 'assets/img/yerba.jpg',
      peso: 1,
    },
    {
      id: 2,
      nombre: 'Yerba Mate ojas 2kg',
      precio: 15000,
      imagen: 'assets/img/yerba.jpg',
      peso: 2,
    },
  ]

   obtenerProductos() {
      return this.productos;
  }
}
