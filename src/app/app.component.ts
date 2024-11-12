import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PantallacargaComponent } from "./pantallacarga/pantallacarga.component";
import { PantallainicioComponent } from "./pantallainicio/pantallainicio.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PantallacargaComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto_EatMapUAA';
}
