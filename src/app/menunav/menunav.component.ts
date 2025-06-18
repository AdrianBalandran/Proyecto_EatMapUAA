import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { SessionManagementService } from '../service/session-management.service';
import { UsuariosGetService } from '../service/usuarios-get.service';

@Component({
  selector: 'app-menunav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menunav.component.html',
  styleUrl: './menunav.component.css'
})
export class MenunavComponent {

  constructor(private session: SessionManagementService, private getusu: UsuariosGetService){

    }

    



}
