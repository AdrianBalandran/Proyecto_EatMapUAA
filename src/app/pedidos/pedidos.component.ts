import { Component } from '@angular/core';
import { MenunavComponent } from "../menunav/menunav.component";
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";
import { SessionManagementService } from '../service/session-management.service';
import { UsuariosGetService } from '../service/usuarios-get.service';
import { Usuario } from '../Interface/usuario';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [MenunavComponent, FooterbajoComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})

export class PedidosComponent {
  auth: boolean = false; 
  flagencargado: boolean = false; 
  id!: any; 
  pedidos!: any; 
  tamano: Number = 0; 
  NoPagados: Number = 0; 
  encargado!: any; 

  
  constructor(private session: SessionManagementService, private getusu: UsuariosGetService, private Titleser: Title){
    Titleser.setTitle("EatMapUAA | Pedidos");
    this.actualizar(); 
  }


  separarpedidos(): Number{
    let i = 0; 
    for(const pedido of this.pedidos){
      if(pedido.Pagado == "N"){
        i++; 
      }
    }
    return i; 
  }

  pedidoEntregado(idOrden: any){
    let orden = {
      Orden: idOrden
    }
    const urlAPI: string = "http://localhost:3000/pedido/entregado"; 
    this.getusu.postNodeEntregado(urlAPI, orden);
    this.actualizar(); 
  }

  pedidoCancelado(idOrden: any){
    let orden = {
      Orden: idOrden
    }
    const urlAPI: string = "http://localhost:3000/pedido/cancelado"; 
    this.getusu.postNodeEntregado(urlAPI, orden);
    this.actualizar(); 
  }

  actualizar(){
    if(this.session.isAuthenticated()){
      this.auth = true; 
      this.id = {Id_Usuario: this.session.getSessionId()}; 
      const urlAPII: string = "http://localhost:3000/pedidos"; 
      const urlAPIII: string = "http://localhost:3000/usuario/get"; 
      let user = {Email: this.session.getSession()}; 
      let usuario!: Usuario; 
      this.getusu.getusuario(urlAPIII, user).subscribe((res: any) => {
        usuario = JSON.parse(JSON.stringify(res));
        if(usuario.Tipo == "E"){
          this.flagencargado = true; 
          const urlAPII: string = "http://localhost:3000/pedidos/getEnc"; 
          this.getusu.getusuario(urlAPII, this.id).subscribe((res: any) => {
            this.pedidos = JSON.parse(JSON.stringify(res)); 
            this.tamano = this.pedidos.length; 
            this.NoPagados = this.separarpedidos();
          });
        }else{
          this.getusu.getusuario(urlAPII, this.id).subscribe((res: any) => {
            this.pedidos = JSON.parse(JSON.stringify(res));
            this.tamano = this.pedidos.length; 
            this.NoPagados = this.separarpedidos();
          });
        }
      });
    }
  }
}

