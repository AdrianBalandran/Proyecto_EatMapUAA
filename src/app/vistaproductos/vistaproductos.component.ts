import { Component } from '@angular/core';
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";
import { MenunavComponent } from "../menunav/menunav.component";
import { BusquedaService } from '../busqueda.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vistaproductos',
  standalone: true,
  imports: [FooterbajoComponent, MenunavComponent, FormsModule, CommonModule],
  templateUrl: './vistaproductos.component.html',
  styleUrl: './vistaproductos.component.css'
})
export class VistaproductosComponent {
  query: string = '';
  filtro: string = 'comida'; // Valor predeterminado
  resultados: any[] = [];
  mensajeError: string = '';

  constructor(private busquedaService: BusquedaService) {}

  // Resetear los resultados y el mensaje de error al cambiar el filtro
  setFiltro(filtro: string) {
    this.query = '';
    this.filtro = filtro;
    this.resultados = [];
    this.mensajeError = '';
  }

  buscar() {
    if (!this.query.trim()) {
      this.mensajeError = 'Por favor, escribe algo para buscar.';
      this.resultados = [];
      return;
    }
  
    this.busquedaService.buscar(this.query, this.filtro).subscribe(
      (data) => {
        // console.log('Datos recibidos:', data); // Verifica la estructura aquí
        if (data.length === 0) {
          this.mensajeError = `No está disponible "${this.query}" por el momento.`;
          this.resultados = [];
        } else {
          this.mensajeError = '';
          this.resultados = data;
        }
      },
      (error) => {
        this.mensajeError = `No está disponible "${this.query}" por el momento.`;
        console.error(error);
      }
    );
  }
  
}

