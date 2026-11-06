import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

export interface Pedido {
  id: number;
  id_usuario: number;
  fecha_pedido: string;
  total: number;
  nombre: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class PedidosADMI {
  private readonly url = 'http://localhost/api_yerba/public/compras';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  obtenerPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.url}/todas`, {
      headers: this.headers(),
    });
  }

  finalizarCompra(): Observable<{ mensaje: string; id_pedido: number; total: number }> {
    return this.http.post<{ mensaje: string; id_pedido: number; total: number }>(
      `${this.url}/finalizar`,
      {},
      { headers: this.headers() },
    );
  }

  private headers(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders(token ? { Authorization: 'Bearer ' + token } : {});
  }
}
