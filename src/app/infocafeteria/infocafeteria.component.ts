import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CafeteriaService } from '../cafetriaservice.service';
import { CommonModule } from '@angular/common';
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";
import { ChatwhatComponent } from "../chatwhat/chatwhat.component";
import { Title } from '@angular/platform-browser';

// Interfaz para tipar los datos de la cafetería
interface Sucursal {
  NombreSucursal: string | null;
  Horario: string | null;
  NumeroLocal: string | null;
  Edificio: string | null;
  Telefono: string | null;
}

interface InformacionCafeteria {
  Nombre: string;
  Sucursales: Sucursal[];
}


@Component({
  selector: 'app-infocafeteria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infocafeteria.component.html',
  styleUrls: ['./infocafeteria.component.css'],
})
export class InfocafeteriaComponent implements OnInit {
  informacion: InformacionCafeteria = { Nombre: '', Sucursales: [] }; // Inicialización
  errorMessage: string = ''; // Declarar y inicializar la variable de error

  constructor(
    private route: ActivatedRoute,
    private cafeteriaService: CafeteriaService, // Servicio inyectado
    private titleser: Title
  ) {
    titleser.setTitle("EatMapUAA | Información Cafetería");
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idCafeteria = Number(params['id']); // Convierte el parámetro a número
      // console.log('ID de cafetería obtenido:', idCafeteria);
  
      // Verificar si es válido
      if (isNaN(idCafeteria) || idCafeteria <= 0) {
        this.errorMessage = 'El ID de la cafetería no es válido.';
        return;
      }
  
      // Si el ID es válido, procede a buscar la información
      this.cargarInformacionCafeteria(idCafeteria);
    });
  }
  
  // Función separada para cargar información
  private cargarInformacionCafeteria(idCafeteria: number): void {
    this.cafeteriaService.getCafeteriaInfo(idCafeteria).subscribe({
      next: (data) => {
        //console.log('Datos recibidos:', data);
        this.informacion = data;
      },
      error: (err) => {
        console.error('Error al cargar los datos:', err);
        this.errorMessage =
          err.message || 'Error al cargar la información de la cafetería.';
      },
    });
  }

  // Método para construir el enlace de WhatsApp
  getWhatsAppLink(telefono: string | null | undefined): string | null {
    const mensaje = encodeURIComponent("Hola!, quisiera consultarte algo sobre el servicio. ¿Tendrías un momento para hablar?");
    if (!telefono || typeof telefono !== 'string' || telefono.trim() === '' || telefono.toLowerCase() === 'null') {
      return null; // Devuelve null si el teléfono no es válido
    }
    return `https://api.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;
  }
  


  



  
}
