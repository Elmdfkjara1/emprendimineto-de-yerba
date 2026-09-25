import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements AfterViewInit {

  ngAfterViewInit(): void {

    const elementos = document.querySelectorAll(
      '.aparecer-izquierda, .aparecer-derecha'
    );

    const observer = new IntersectionObserver(
      (entradas) => {

        entradas.forEach((entrada) => {

          if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
            observer.unobserve(entrada.target);
          }

        });

      },
      {
        threshold: 0.2
      }
    );

    elementos.forEach((elemento) => {
      observer.observe(elemento);
    });

  }

}
