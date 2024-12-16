import { Component } from '@angular/core';
import { MenuadminComponent } from "../menuadmin/menuadmin.component";
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";
import { UsuariosGetService } from '../service/usuarios-get.service';
import { Route, Router } from '@angular/router';
import { SessionManagementService } from '../service/session-management.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cambiarusuarios',
  standalone: true,
  imports: [MenuadminComponent, FooterbajoComponent, CommonModule, FormsModule],
  templateUrl: './cambiarusuarios.component.html',
  styleUrl: './cambiarusuarios.component.css'
})
export class CambiarusuariosComponent {

  usuarios!: any; 
  nombre!: number;
  tipo: string = "Admin";
  cafeteria!: number;
  sucursal!: number;
  cafeterias!: any; 
  response!: any; 
  message: string = ""; 

  constructor(private getusu: UsuariosGetService, private router: Router, private session: SessionManagementService, private titleser: Title){
    titleser.setTitle("EatMapUAA | Administrador"); 
    if(this.session.isAuthenticated()){
      const urlAPI: string = "http://192.168.100.25:3000/usuario/info"; 
      this.getusu.getusuario(urlAPI, {Id_Usuario: this.session.getSessionId()}).subscribe((res: any) => {
        this.usuarios = JSON.parse(JSON.stringify(res));
        this.nombre = this.usuarios[0].Id_Usuario;
      }); 
      this.getCafeterias(); 
    }
  }

  getCafeterias(){
    const urlAPI: string = "http://192.168.100.25:3000/cafeusu/todos"; 
    this.getusu.getJSON(urlAPI).subscribe((res: any) => {
      this.cafeterias = JSON.parse(JSON.stringify(res));
      this.cafeteria = this.cafeterias[0].Id_Cafeteria;
      this.sucursal = this.cafeterias[0].Sucursales[0].Id_Sucursal; 
    }); 
  }

  onChangeNombre(deviceValue: any) {
    this.nombre = deviceValue.value; 
  }

  onChangeTipo(deviceValue: any) {
    this.tipo = deviceValue.value; 
  }

  onChangeCafeteria(deviceValue: any) {
    this.cafeteria = deviceValue.value; 
  }

  onChangeSucursal(deviceValue: any) {
    this.sucursal = deviceValue.value; 
  }

  getSucu(): any{
    return this.cafeterias.find((rel: any) => rel.Id_Cafeteria == Number(this.cafeteria)).Sucursales; 
  }

  cambiarUsuario(){
    const urlAPI: string = "http://192.168.100.25:3000/usuario/cambiar"; 
    const data = {
      Id_Usuario: Number(this.nombre), 
      Tipo: this.tipo, 
      Id_Cafeteria: this.cafeteria, 
      Id_Sucursal: this.sucursal
    }
    this.getusu.getusuario(urlAPI, data).subscribe((res: any) => {
      this.response = JSON.parse(JSON.stringify(res));
      if(this.response.success){
        this.message = this.response.message; 
      }
    }, (err: { error: { message: any; }; message: any; }) => { 
      this.message = err.error.message; 
    });
  }
}

