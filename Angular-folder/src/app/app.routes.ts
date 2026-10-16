import { Routes } from '@angular/router';
import { Inicio } from './pagina/inicio/inicio';
import { Contacto } from './pagina/contacto/contacto';
import { Footer } from './compartidos/footer/footer';
import { Navbar } from './compartidos/navbar/navbar';
import { Carrito } from './compartidos/carrito/carrito';
import { InicioSesion } from './auth/inicio-sesion/inicio-sesion';
import { Registro } from './auth/registro/registro';
import { Productos } from './pagina/producto/producto';
import { ModificarProducto } from './pagina/mod-producto/mod-producto';
import { VerPedidos  } from './pagina/pedidos-admi/pedidos-admi';

export const routes: Routes = [
{path: '', redirectTo: 'inicio', pathMatch: 'full'}, 
{path : 'inicio', component: Inicio}, 
{path : 'producto', component: Productos},
{path: 'contacto', component: Contacto}, 
{path: 'footer', component: Footer}, 
{path: 'navbar', component: Navbar}, 
{path: 'carrito', component: Carrito}, 
{path: 'inicioSesion', component: InicioSesion}, 
{path: 'registro', component: Registro},
{path: 'modificar-producto', component: ModificarProducto},
{path : 'pedidos-admi', component: VerPedidos},
];
