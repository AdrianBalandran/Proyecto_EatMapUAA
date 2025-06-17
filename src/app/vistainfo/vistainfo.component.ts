import { Component } from '@angular/core';
import { Comida } from '../Interface/comida';
import { UsuariosGetService } from '../service/usuarios-get.service';
import { Router } from '@angular/router';
import { SessionManagementService } from '../service/session-management.service';
import { Usuario } from '../Interface/usuario';
import { HttpClientModule } from '@angular/common/http';
import { FooterbajoComponent } from '../footerbajo/footerbajo.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vistainfo',
  standalone: true,
  imports: [FooterbajoComponent, HttpClientModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './vistainfo.component.html',
  styleUrl: './vistainfo.component.css'
})
export class VistainfoComponent {
  informacion: any = { Ingredientes: [], Horario: '', NombreCafeteria: '' }; // Inicializar informacion con propiedades vacías
  comida: Comida = {} as Comida; // Inicializar comida como un objeto vacío
  tipoPago: String = 'E'; 
  data: any = {
    Id_Comida: 3
  }
  inicio = ""; 
  final = ""; 
  auth = false; 
  sucursal: String = ""; 
  NoComidas: Number = 1; 
  Sucursales: any = []; // Inicializar Sucursales como un array vacío
  message: string = ""; 
  


  constructor(private getusu: UsuariosGetService, private session: SessionManagementService, public activatedRoute: ActivatedRoute, private router: Router){
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
      let dataCafe = {Id_Cafeteria: this.comida.Id_Cafeteria}; 
      const urlapi: string = "http://localhost:3000/cafeterias/sucursales"; 
      this.getusu.getusuario(urlapi, dataCafe).subscribe((res:any) => {
        this.Sucursales = JSON.parse(JSON.stringify(res));
        this.sucursal = this.Sucursales[0].Id_Sucursal; 
      }); 
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

  SetTipoPago(tipo: string) {
    this.tipoPago = tipo;
  }

  pedir(){
    // let date: Date = new Date(2024, 12, 13, 7, 23, 42);  

    let date: Date = new Date()  
    let dia = date.getUTCDay();  
    let hour = date.getHours(); 
    let nochediaflag = true; 
    if(hour > 12){
      nochediaflag = false; 
      hour -= 12; 
    }

    // if(dia == 0 || dia == 6){
    //   this.message = "No hay servicio Sábado ni Domingo"; 
    // }else if((nochediaflag && hour < Number(this.inicio)) || (!nochediaflag && hour > Number(this.inicio))){
    //   this.message = "No está abierto"; 
    // }else{
    const dates = new Date();
const fechaFormateada = dates.toISOString().split('T')[0];
      const pedido = {
        Id_Usuario: this.session.getSessionId(), 
        Id_Cafeteria: this.comida.Id_Cafeteria, 
        Id_Sucursal: this.parseInt(this.sucursal),
        Orden: 0,
        Pagado: "N",
        Tiempo: this.comida.TiempoPrepa,
        Tipo_pago: this.tipoPago,
        Fecha: fechaFormateada
      }
      const Id_Comida = {
        Pedido: pedido, 
        Comida: {Id_Comida: this.data.Id_Comida, NoComida: this.NoComidas}
      }
  
      const urlapi: string = "http://localhost:3000/pedido/agregar"; 
      this.getusu.getusuario(urlapi, Id_Comida).subscribe((res:any) => {
        console.log(JSON.parse(JSON.stringify(res))); 
        if(JSON.parse(JSON.stringify(res)).Status){
          this.router.navigate(['/pedidos/']); 
        }
      }); 
    // }
  }
  parseInt(data: String){
    return Number(data); 
  }
}
