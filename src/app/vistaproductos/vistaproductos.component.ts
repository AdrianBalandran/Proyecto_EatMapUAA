import { Component, OnInit } from '@angular/core';
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";
import { MenunavComponent } from "../menunav/menunav.component";
import { BusquedaService } from '../busqueda.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VistainfoComponent } from '../vistainfo/vistainfo.component';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vistaproductos',
  standalone: true,
  imports: [FooterbajoComponent, MenunavComponent, FormsModule, CommonModule, VistainfoComponent, RouterModule],
  templateUrl: './vistaproductos.component.html',
  styleUrl: './vistaproductos.component.css'
})
export class VistaproductosComponent implements OnInit {
  query: string = '';  // Consulta del buscador
  filtro: string = 'comida'; // Filtro predeterminado
  resultados: any[] = []; // Resultados de la búsqueda
  mensajeError: string = ''; // Mensaje de error
  loading: boolean = false; // Estado de carga

  constructor(private busquedaService: BusquedaService, private titelser: Title) {
    titelser.setTitle("EatMapUAA | Vista Feel");
  }

  ngOnInit() {
    // Ejecutar la búsqueda cuando el componente se carga por primera vez
    this.buscar();
  }

  // Resetear los resultados y el mensaje de error al cambiar el filtro
  setFiltro(filtro: string) {
    this.query = '';  // Restablecer la consulta
    this.filtro = filtro;  // Establecer el nuevo filtro
    this.resultados = [];  // Limpiar los resultados
    this.mensajeError = '';  // Limpiar el mensaje de error

    // Ejecutar la búsqueda inmediatamente después de cambiar el filtro
    this.buscar();
  }

  buscar() {
    this.loading = true; // Iniciar el estado de carga
    this.resultados = [];
    this.mensajeError = '';

    // Verifica si el filtro es "ingrediente" y no hay búsqueda activa
    if (this.filtro === 'ingrediente' && this.query === '') {
        this.mensajeError = 'Realiza una búsqueda por ingrediente para obtener resultados.';
        this.loading = false; // Detener el estado de carga
        return; // No hacer la llamada al servicio si está vacío el campo de búsqueda
    }

    this.busquedaService.buscar(this.query, this.filtro).subscribe(
        (data) => {
            if (data.length === 0) {
                this.mensajeError = `No se encontraron resultados para "${this.query}".`;
                this.resultados = [];
            } else {
                this.resultados = data;
                this.mensajeError = '';
            }
            this.loading = false; // Detener el estado de carga
        },
        (error) => {
            this.mensajeError = `No se encontraron resultados para "${this.query}".`;
            console.error(error);
            this.loading = false; // Detener el estado de carga
        }
    );
}
}
