import { Component, signal } from '@angular/core';
import { FormField, form, required, email as emailValidator } from '@angular/forms/signals';

@Component({
  selector: 'app-contacto',
  // FormField es la directiva que conecta cada <input>/<textarea> del HTML
  // con su campo correspondiente dentro del formulario (se usa como [formField]="...")
  imports: [FormField],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

  // "datos" es un signal: una caja reactiva que guarda el estado del formulario.
  // Cuando su valor cambia, Angular actualiza automáticamente todo lo que depende de él.
  // Este es el modelo "puro" de datos, sin nada de lógica de formulario todavía.
  datos = signal({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  // form() envuelve el signal "datos" y genera un árbol de campos reactivo (FieldTree).
  // El segundo argumento es la función de esquema: ahí se definen las reglas de validación
  // para cada campo, usando "path" para navegar la estructura de "datos" de forma tipada.
  contactForm = form(this.datos, (path) => {

    // required() marca el campo como obligatorio.
    // El "message" es el texto que se muestra cuando el campo está vacío y fue tocado.
    required(path.nombre, { message: 'Ingresá tu nombre.' });

    required(path.email, { message: 'Ingresá tu correo.' });
    // emailValidator() (importado como "email" desde @angular/forms/signals)
    // valida que el valor tenga formato de correo electrónico válido.
    emailValidator(path.email, { message: 'Correo inválido.' });

    required(path.asunto, { message: 'Ingresá un asunto.' });

    required(path.mensaje, { message: 'Escribí tu mensaje.' });
  });

  // Signal que controla si se muestra el mensaje de "enviado con éxito".
  // Arranca en false y se pone en true cuando el envío se completa correctamente.
  enviado = signal(false);

  enviarFormulario(event: Event) {
    // Evita que el navegador recargue la página al enviar el <form> (comportamiento por defecto del HTML).
    event.preventDefault();

    // contactForm() (con paréntesis) lee el estado actual del formulario como signal.
    // .invalid() indica si hay algún campo con errores de validación.
    // Si el formulario es inválido, cortamos acá y no se envía nada.
    if (this.contactForm().invalid()) return;

    // Acá iría la llamada real al backend (HttpClient, EmailJS, etc.)
    // Por ahora solo mostramos los datos en consola a modo de ejemplo.
    console.log(this.datos());

    // Activamos el signal para que el template muestre el mensaje de confirmación.
    this.enviado.set(true);
  }
}