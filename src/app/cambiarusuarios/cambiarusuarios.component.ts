import { Component } from '@angular/core';
import { MenuadminComponent } from "../menuadmin/menuadmin.component";
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";

@Component({
  selector: 'app-cambiarusuarios',
  standalone: true,
  imports: [MenuadminComponent, FooterbajoComponent],
  templateUrl: './cambiarusuarios.component.html',
  styleUrl: './cambiarusuarios.component.css'
})
export class CambiarusuariosComponent {

}
