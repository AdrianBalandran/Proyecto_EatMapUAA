import { Component } from '@angular/core';
import { UsuariopagComponent } from '../usuariopag/usuariopag.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menuadmin',
  standalone: true,
  imports: [UsuariopagComponent, RouterModule],
  templateUrl: './menuadmin.component.html',
  styleUrl: './menuadmin.component.css'
})
export class MenuadminComponent {

}
