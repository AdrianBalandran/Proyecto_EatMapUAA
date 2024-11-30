import { Component } from '@angular/core';
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";
import { MenunavComponent } from "../menunav/menunav.component";
import { BusquedaService } from '../busqueda.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comida } from '../Interface/comida'; // Ajusta la ruta al modelo correcto
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vistaproductos',
  standalone: true,
  imports: [FooterbajoComponent, MenunavComponent, FormsModule, CommonModule],
  templateUrl: './vistaproductos.component.html',
  styleUrl: './vistaproductos.component.css'
})
export class VistaproductosComponent {
  resultados: any[] = []; // Almacenará los resultados de la búsqueda
  query: string = ''; // Cadena de búsqueda

  constructor(private busquedaService: BusquedaService) {}

  ngOnInit(): void {
    this.cargarMenus(); // Cargar los menús por defecto
  }

  // Cargar menús iniciales
  cargarMenus(): void {
    this.busquedaService.buscarMenus().subscribe(
      (data) => {
        this.resultados = data;
      },
      (error) => {
        console.error('Error al cargar menús:', error);
      }
    );
  }

  // Método para realizar la búsqueda
  buscar(): void {
    if (this.query.trim() === '') {
      this.cargarMenus(); // Si la búsqueda está vacía, cargar menús por defecto
    } else {
      this.busquedaService.buscarComidas(this.query).subscribe(
        (data) => {
          this.resultados = data;
        },
        (error) => {
          console.error('Error al buscar comidas:', error);
        }
      );
    }
  }
}
