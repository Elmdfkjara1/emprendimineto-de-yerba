import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarritoService } from './../../servicios/carrito';
import { Producto } from '../../interfaz/productoInterfaz';
import { ProductosApi } from '../../servicios/productos-api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Productos implements OnInit {
  productos: Producto[] = [];
  producto: Producto | null = null;
  cantidad = 1;
  cargando = true;
  error = '';

  constructor(
    private carrito: CarritoService,
    private productosApi: ProductosApi,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.error = '';

    this.productosApi.listar().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.producto = productos[0] ?? null;
        this.cantidad = 1;
        this.cargando = false;
        this.changeDetector.markForCheck();
      },
      error: (error: unknown) => {
        console.error('No se pudieron cargar los productos', error);
        this.error = 'No se pudieron cargar los productos. Intenta nuevamente.';
        this.cargando = false;
        this.changeDetector.markForCheck();
      },
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carrito.agregarAlCarrito({ ...producto, cantidad: this.cantidad });
  }

  disminuirCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  aumentarCantidad(): void {
    if (this.producto && this.cantidad < this.producto.stock) {
      this.cantidad++;
    }
  }

  seleccionarProducto(id: number): void {
    const productoSeleccionado = this.productos.find((producto) => producto.id === id);
    if (productoSeleccionado) {
      this.producto = productoSeleccionado;
      this.cantidad = 1;
    }
  }
}