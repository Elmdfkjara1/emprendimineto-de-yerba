import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
 constructor(
  private authService: AuthService
 ) {}
  
}
