import { Component, Injectable } from '@angular/core';
import { CarritoService } from './../../servicios/carrito';
import { Producto } from '../../interfaz/productoInterfaz';

@Component({
  selector: 'app-producto',
  imports: [],
  standalone:true,
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
@Injectable({
  providedIn: 'root',
})
export class Productos {
  producto: Producto[] = [
    
  ];
  static id: any;

  //constructor(private carrito: Carrito) {}
 //AgregarCarrito(producto: Producto) {
 //   this.carrito.agregarAlCarrito(producto);
 // }
}