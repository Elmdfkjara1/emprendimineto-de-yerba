import { Injectable } from '@angular/core';
import { Producto } from '../interfaz/productoInterfaz';

@Injectable({
  providedIn: 'root',
})
export class ExpProductos {
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Yerba Mate Ojas 1kg',
      precio: 10000,
      imagen: 'assets/yerba2k.jpg',
      peso: 1,
      cantidad: 1,
    },
    {
      id: 2,
      nombre: 'Yerba Mate Ojas 2kg',
      precio: 20000,
      imagen: 'assets/yerba2k.jpg',
      peso: 2,
      cantidad: 1,
    },
  ]

   obtenerProductos() {
      return this.productos;
  }
}
