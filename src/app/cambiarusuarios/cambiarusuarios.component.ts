import { Component } from '@angular/core';
import { MenuadminComponent } from "../menuadmin/menuadmin.component";
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";
import { UsuariosGetService } from '../service/usuarios-get.service';
import { Route, Router } from '@angular/router';
import { SessionManagementService } from '../service/session-management.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

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
  cafeteriastotales!: any; 
  sucursalestotales!: any; 
  response!: any; 
  message: string = ""; 

  constructor(private getusu: UsuariosGetService, private router: Router, private session: SessionManagementService, private titleser: Title){
    titleser.setTitle("EatMapUAA | Administrador"); 
    if(this.session.isAuthenticated()){
      const urlAPI: string = "http://localhost:3000/usuario/info"; 
      this.getusu.getusuario(urlAPI, {Id_Usuario: this.session.getSessionId()}).subscribe((res: any) => {
        this.usuarios = JSON.parse(JSON.stringify(res));
        this.nombre = this.usuarios[0].Id_Usuario;
      }); 
      this.getCafeterias(); 
    }
  }

  getCafeterias(){
    const urlAPI: string = "http://localhost:3000/cafeusu/todos"; 
    this.getusu.getJSON(urlAPI).subscribe((res: any) => {
      this.cafeterias = JSON.parse(JSON.stringify(res));
      this.findDistinct(); 
      this.cafeteria = this.cafeterias[0].Id_Cafeteria;
      this.sucursal = Number(this.cafeterias[0].Id_Sucursal); 
    }); 
  }

  onChangeNombre(deviceValue: any) {
    this.nombre = deviceValue.value; 
  }

  onChangeTipo(deviceValue: any) {
    this.tipo = deviceValue.value; 
    this.findSucursales(this.cafeteria); 
  }

  onChangeCafeteria(deviceValue: any) {
    this.cafeteria = deviceValue.value; 
    let suc = this.findSucursales(this.cafeteria);
    this.sucursal = suc[0].Id_Sucursal; 
  }

  onChangeSucursal(deviceValue: any) {
    this.sucursal = deviceValue.value; 
  }

  getSucu(): any{
    return this.findSucursales(this.cafeteria); 
  }

  cambiarUsuario(){
    const urlAPI: string = "http://localhost:3000/usuario/cambiar"; 
    const data = {
      Id_Usuario: this.nombre, 
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

  findDistinct() {
    let res = [];
    for (let i = 0; i < this.cafeterias.length; i++) {
        let j;
        for (j = 0; j < i; j++)
            if (this.cafeterias[i].Id_Cafeteria === this.cafeterias[j].Id_Cafeteria)
                break;
        // Include this element if not included previously
        if (i === j){
            res.push({Id_Cafeteria: this.cafeterias[i].Id_Cafeteria, Nombre_Cafeteria:this.cafeterias[i].Nombre_Cafeteria});
        }
    }
    this.cafeteriastotales = res;
  }

  findSucursales(num: Number) {
    this.sucursalestotales = []; 
    for (let i = 0; i < this.cafeterias.length; i++) {
      if (Number(this.cafeterias[i].Id_Cafeteria) == num){
        this.sucursalestotales.push({Id_Sucursal: this.cafeterias[i].Id_Sucursal, Nombre_Sucursal:this.cafeterias[i].Nombre_Sucursal});
      }
    }
    return this.sucursalestotales; 
  }


}

