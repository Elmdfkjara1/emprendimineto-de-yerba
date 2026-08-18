import { Routes } from '@angular/router';
import { Inicio } from './pagina/inicio/inicio';
import { Producto } from './pagina/producto/producto';
import { Contacto } from './pagina/contacto/contacto';
import { Footer } from './compartidos/footer/footer';
import { Navbar } from './compartidos/navbar/navbar';
import { Carrito } from './compartidos/carrito/carrito';
import { InicioSesion } from './auth/inicio-sesion/inicio-sesion';

export const routes: Routes = [
{path: '', redirectTo: 'inicio', pathMatch: 'full'}, 
{path : 'inicio', component: Inicio}, 
{path : 'producto', component: Producto},
{path: 'contacto', component: Contacto}, 
{path: 'footer', component: Footer}, 
{path: 'navbar', component: Navbar}, 
{path: 'carrito', component: Carrito}, 
{path: 'iniciosesion', component: InicioSesion}, 
];


