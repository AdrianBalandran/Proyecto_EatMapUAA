import { Component } from '@angular/core';
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";
import { MenunavComponent } from "../menunav/menunav.component";
import { SessionManagementService } from '../service/session-management.service';
import { Usuario } from '../Interface/usuario';
import { UsuariosGetService } from '../service/usuarios-get.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuariopag',
  standalone: true,
  imports: [FooterbajoComponent, MenunavComponent, HttpClientModule, CommonModule, RouterLink],
  templateUrl: './usuariopag.component.html',
  styleUrl: './usuariopag.component.css'
})
export class UsuariopagComponent {
  nombre: any = "";
  auth: boolean = false; 
  flagencargado: boolean = false; 
  user!: any;
  usuario!: Usuario;
  encargado!: any;



  constructor(private session: SessionManagementService, private getusu: UsuariosGetService){
    if(this.session.isAuthenticated()){
      this.auth = true; 
      this.user = {Email: this.session.getSession()}; 
      const urlAPII: string = "http://localhost:3000/usuario/get"; 
      const urlAPI: string = "http://localhost:3000/usuario/getsuyca"; 

      this.getusu.getusuario(urlAPII, this.user).subscribe((res: any) => {
        this.usuario = JSON.parse(JSON.stringify(res));
        if(this.usuario.Tipo == "Encargado"){
          this.getusu.getusuario(urlAPI, this.user).subscribe((res: any) => {
            this.encargado = JSON.parse(JSON.stringify(res));
            this.flagencargado = true; 
          });
        }
      });

    }
  }

}