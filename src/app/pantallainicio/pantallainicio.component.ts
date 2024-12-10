import { Component } from '@angular/core';
import { MenunavComponent } from "../menunav/menunav.component";
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuariosGetService } from '../service/usuarios-get.service';
import { SessionManagementService } from '../service/session-management.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pantallainicio',
  standalone: true,
  imports: [MenunavComponent, FooterbajoComponent,RouterLink],
  templateUrl: './pantallainicio.component.html',
  styleUrl: './pantallainicio.component.css'
})
export class PantallainicioComponent {
  nombre: any = "";
  auth: boolean = false; 


  constructor(private router: Router, private session: SessionManagementService, private titleser: Title){
    titleser.setTitle("EatMapUAA | Inicio");
    if(this.session.isAuthenticated()){
      this.actualizar(true);
    }
  }
  
  actualizar(flag: boolean){
    this.nombre = this.session.getSessionName(); 
    this.auth = flag; 
  }
  
  endsession(){
    this.session.endSession(); 
    this.actualizar(false);
  }
}
