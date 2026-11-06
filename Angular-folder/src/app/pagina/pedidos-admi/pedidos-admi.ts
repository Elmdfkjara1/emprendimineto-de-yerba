import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Pedido, PedidosADMI } from '../../servicios/pedidos-admi';

@Component({
  selector: 'app-ver-pedidos',
  imports: [],
  templateUrl: './pedidos-admi.html',
  styleUrl: './pedidos-admi.css'
})
export class VerPedidos implements OnInit {
  pedidos: Pedido[] = [];
  error = '';

  constructor(
    private pedidosAdmi: PedidosADMI,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.pedidosAdmi.obtenerPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos;
        this.changeDetector.markForCheck();
      },
      error: (error: unknown) => {
        console.error('No se pudieron cargar los pedidos', error);
        this.error = 'No se pudieron cargar los pedidos.';
        this.changeDetector.markForCheck();
      },
    });
  }

  eliminarFilaPedido(indicePedido: number): void {
    this.pedidos = this.pedidos.filter((_, indice) => indice !== indicePedido);
  }
}
