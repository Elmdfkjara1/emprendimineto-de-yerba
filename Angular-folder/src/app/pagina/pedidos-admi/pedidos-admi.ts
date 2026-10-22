import { Component, OnInit } from '@angular/core';
import { PedidosADMI } from '../../servicios/pedidos-admi';

@Component({
  selector: 'app-ver-pedidos',
  imports: [],
  templateUrl: './pedidos-admi.html',
  styleUrl: './pedidos-admi.css'
})
export class VerPedidos implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidosAdmi: PedidosADMI) {}

  ngOnInit(): void {
    this.pedidos = this.pedidosAdmi.obtenerPedidos();
  }
}
