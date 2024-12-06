import { Component } from '@angular/core';
import { Comida } from '../Interface/comida';

@Component({
  selector: 'app-vistainfo',
  standalone: true,
  imports: [],
  templateUrl: './vistainfo.component.html',
  styleUrl: './vistainfo.component.css'
})
export class VistainfoComponent {
  comida: Comida = {
    Id_Comida: 1, 
    Nombre: "Guajolotas", 
    Precio: 40,
    Cafeteria_Sucursal: 1, 
    TiempoPrepa: 10, 
    Id_Cafeteria: 1, 
    Id_Sucursal: 2
  }


}
