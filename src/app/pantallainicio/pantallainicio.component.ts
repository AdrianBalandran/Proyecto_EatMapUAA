import { Component } from '@angular/core';
import { MenunavComponent } from "../menunav/menunav.component";
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";

@Component({
  selector: 'app-pantallainicio',
  standalone: true,
  imports: [MenunavComponent, FooterbajoComponent],
  templateUrl: './pantallainicio.component.html',
  styleUrl: './pantallainicio.component.css'
})
export class PantallainicioComponent {

}
