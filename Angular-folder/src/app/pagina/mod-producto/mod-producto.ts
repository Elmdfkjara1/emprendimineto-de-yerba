import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Producto } from '../../interfaz/productoInterfaz';
import { ProductoActualizacion, ProductosApi } from '../../servicios/productos-api';

@Component({
  selector: 'app-modificar-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mod-producto.html',
  styleUrl: './mod-producto.css',
})
export class ModificarProducto implements OnInit {
  productos: Producto[] = [];
  nuevoPeso = 1;
  nuevoPrecio = 0;
  productoEditando: Producto | null = null;
  precioEditado = 0;
  cargando = true;
  guardando = false;
  error = '';
  mensaje = '';

  constructor(
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
        this.cargando = false;
        this.changeDetector.markForCheck();
      },
      error: (error: unknown) => {
        console.error('No se pudieron cargar los productos para administrarlos', error);
        this.error = this.mensajeError(error, 'No se pudieron cargar los productos.');
        this.cargando = false;
        this.changeDetector.markForCheck();
      },
    });
  }

  editarProducto(producto: Producto): void {
    this.productoEditando = producto;
    this.precioEditado = producto.precio;
    this.error = '';
    this.mensaje = '';
  }

  guardarPrecio(): void {
    if (!this.productoEditando || this.precioEditado <= 0) {
      this.error = 'Ingresá un precio válido.';
      return;
    }

    const producto = this.productoEditando;
    const datos: ProductoActualizacion = {
      nombre: producto.nombre,
      precio: this.precioEditado,
      stock: producto.stock,
      imagen: producto.imagen,
      peso: producto.peso,
      cantidadKilos: producto.cantidadKilos ?? 1,
    };

    this.guardando = true;
    this.error = '';
    this.mensaje = '';
    this.productosApi.actualizar(producto.id, datos).subscribe({
      next: () => {
        this.productoEditando = null;
        this.mensaje = 'Precio actualizado correctamente.';
        this.guardando = false;
        this.cargarProductos();
      },
      error: (error: unknown) => this.manejarError(error, 'No se pudo actualizar el producto.'),
    });
  }

  cancelarEdicion(): void {
    this.productoEditando = null;
    this.error = '';
  }

  agregarProducto(): void {
    if (this.nuevoPeso <= 0 || this.nuevoPrecio <= 0) {
      this.error = 'Ingresá un peso y un precio válidos.';
      return;
    }

    this.guardando = true;
    this.error = '';
    this.mensaje = '';
    this.productosApi.crear({
      nombre: `Yerba Mate Ojas ${this.nuevoPeso}kg`,
      precio: this.nuevoPrecio,
      stock: 10,
      imagen: 'assets/yerba2k.jpg',
      peso: this.nuevoPeso,
      cantidadKilos: 1,
    }).subscribe({
      next: () => {
        this.nuevoPeso = 1;
        this.nuevoPrecio = 0;
        this.mensaje = 'Producto agregado correctamente.';
        this.guardando = false;
        this.cargarProductos();
      },
      error: (error: unknown) => this.manejarError(error, 'No se pudo agregar el producto.'),
    });
  }

  eliminarProducto(id: number): void {
    if (!confirm('¿Estás seguro de que querés eliminar este producto?')) {
      return;
    }

    this.guardando = true;
    this.error = '';
    this.mensaje = '';
    this.productosApi.eliminar(id).subscribe({
      next: () => {
        this.mensaje = 'Producto eliminado correctamente.';
        this.guardando = false;
        this.cargarProductos();
      },
      error: (error: unknown) => this.manejarError(error, 'No se pudo eliminar el producto.'),
    });
  }

  private manejarError(error: unknown, mensajePredeterminado: string): void {
    console.error(mensajePredeterminado, error);
    this.error = this.mensajeError(error, mensajePredeterminado);
    this.guardando = false;
    this.changeDetector.markForCheck();
  }

  private mensajeError(error: unknown, mensajePredeterminado: string): string {
    if (error instanceof HttpErrorResponse && typeof error.error?.error === 'string') {
      return error.error.error;
    }
    if (error instanceof HttpErrorResponse && error.status === 401) {
      return 'Iniciá sesión nuevamente para administrar productos.';
    }
    if (error instanceof HttpErrorResponse && error.status === 403) {
      return 'Tu usuario no tiene permisos de administrador.';
    }
    return mensajePredeterminado;
  }
}
