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

  buscar(): void {
    if (this.query.trim() === '') {
      this.resultados = [];
      return;
    }

    this.busquedaService.buscarGeneral(this.query).subscribe(
      (data: { menus: any; ingredientes: any; cafeterias: any; }) => {
        const { menus, ingredientes, cafeterias } = data;
        this.resultados = [...menus, ...ingredientes, ...cafeterias];
      },
      (error: any) => {
        console.error('Error al realizar la búsqueda:', error);
        this.resultados = [];
      }
    );
  }
}
