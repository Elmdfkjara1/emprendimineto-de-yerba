import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Producto } from '../../interfaz/productoInterfaz';
import { CarritoService } from '../../servicios/carrito';
import { ProductosApi } from '../../servicios/productos-api';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Productos implements OnInit {
  productos: Producto[] = [];
  producto: Producto | null = null;
  cantidad = 1;
  cargando = true;
  agregando = false;
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
    this.agregando = true;
    this.error = '';
    this.carrito.agregarAlCarrito({ ...producto, cantidad: this.cantidad }).subscribe({
      next: () => {
        this.agregando = false;
        this.changeDetector.markForCheck();
      },
      error: (error: unknown) => {
        console.error('No se pudo agregar el producto al carrito', error);
        this.error = error instanceof HttpErrorResponse && error.status === 401
          ? 'Iniciá sesión para agregar productos al carrito.'
          : 'No se pudo agregar el producto al carrito. Intenta nuevamente.';
        this.agregando = false;
        this.changeDetector.markForCheck();
      },
    });
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
    const seleccionado = this.productos.find((producto) => producto.id === id);
    if (seleccionado) {
      this.producto = seleccionado;
      this.cantidad = 1;
    }
  }
}
