import { Component, OnInit } from '@angular/core';
import { PantallainicioComponent } from "./pantallainicio/pantallainicio.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PantallainicioComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto_EatMapUAA';

  
}
