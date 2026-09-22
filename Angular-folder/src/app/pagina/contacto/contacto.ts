import { Component, signal } from '@angular/core';
import { FormField, form, required, email } from '@angular/forms/signals';

@Component({
  selector: 'app-contacto',
  imports: [FormField], // permite usar [formField] en el HTML
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

  // 1) Los datos del formulario: arrancan vacíos
  datos = signal({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  // 2) El formulario: toma los datos y le agregamos las reglas
  contactForm = form(this.datos, (campos) => {
    required(campos.nombre);   // obligatorio
    required(campos.email);
    email(campos.email);       // tiene que parecer un correo
    required(campos.asunto);
    required(campos.mensaje);
  });

  // 3) Controla el mensaje de "¡Gracias!" del HTML
  enviado = signal(false);

  enviarFormulario(event: Event) {
    event.preventDefault(); // evita que la página se recargue

    if (this.contactForm().invalid()) return; // si hay errores, no se envía

    console.log(this.datos()); // acá iría el envío real
    this.enviado.set(true);
  }
}