import { Component } from '@angular/core';
import { Comida } from '../Interface/comida';
import { UsuariosGetService } from '../service/usuarios-get.service';
import { Router } from 'express';
import { SessionManagementService } from '../service/session-management.service';
import { Usuario } from '../Interface/usuario';
import { HttpClientModule } from '@angular/common/http';
import { FooterbajoComponent } from '../footerbajo/footerbajo.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vistainfo',
  standalone: true,
  imports: [FooterbajoComponent, HttpClientModule, CommonModule, RouterLink],
  templateUrl: './vistainfo.component.html',
  styleUrl: './vistainfo.component.css'
})
export class VistainfoComponent {
  informacion: any; 
  comida!: Comida; 
  data: any = {
    Id_Comida: 3
  }
  inicio = ""; 
  final = ""; 
  auth = false; 



  constructor(private getusu: UsuariosGetService, private session: SessionManagementService, public activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(params => {
      this.data.Id_Comida = params['id']; 
      console.log(params['id']); 
    })

    if(this.session.isAuthenticated()){
      this.auth = true; 
    }else{
      this.session.endSession; 
    }
    const urlAPI: string = "http://localhost:3000/comidaid"; 
    this.getusu.getusuario(urlAPI, this.data).subscribe((res:any) => {
      this.informacion = JSON.parse(JSON.stringify(res));
      this.comida = this.informacion.Comida; 
      this.getHorario(); 
      console.log(this.inicio); 
      console.log(this.final); 
    }); 
  }

  getHorario(){
    let flag = false; 
    for(let i=0; i<this.informacion.Horario.length; i++){
      if(this.informacion.Horario[i].charCodeAt(0) >= 48 && this.informacion.Horario[i].charCodeAt(0) <= 57){
        if(!flag){
          this.inicio = this.inicio + this.informacion.Horario[i];
        }else{
          this.final = this.final + this.informacion.Horario[i];
        }
      }else{
        if(!flag){
          flag= true; 
        }
      }
    }
  }
  hacerPedido(){
    
  }
}
