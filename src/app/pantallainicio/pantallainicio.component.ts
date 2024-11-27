import { Component } from '@angular/core';
import { MenunavComponent } from "../menunav/menunav.component";
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pantallainicio',
  standalone: true,
  imports: [MenunavComponent, FooterbajoComponent,RouterLink],
  templateUrl: './pantallainicio.component.html',
  styleUrl: './pantallainicio.component.css'
})
export class PantallainicioComponent {

  constructor(private router : Router){}
}
