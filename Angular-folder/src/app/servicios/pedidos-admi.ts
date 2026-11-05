import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PedidosADMI {
  private url = 'http://localhost/api_proyecto/public/compras'; // ajustá a tu URL base

  constructor(private http: HttpClient) {}

  obtenerPedidos() {
    return this.http.get<any[]>(`${this.url}/todas`);
  }

  finalizarCompra() {
    return this.http.post<{ mensaje: string; id_pedido: number; total: number }>(
      `${this.url}/finalizar`, {}
    );
  }
}