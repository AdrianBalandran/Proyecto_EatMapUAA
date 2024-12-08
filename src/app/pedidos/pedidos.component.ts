import { Component } from '@angular/core';
import { MenunavComponent } from "../menunav/menunav.component";
import { FooterbajoComponent } from "../footerbajo/footerbajo.component";
import { SessionManagementService } from '../service/session-management.service';
import { UsuariosGetService } from '../service/usuarios-get.service';
import { Usuario } from '../Interface/usuario';

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

  
  constructor(private session: SessionManagementService, private getusu: UsuariosGetService){
    if(this.session.isAuthenticated()){
      this.auth = true; 
      this.id = {Id_Usuario: this.session.getSessionId()}; 
      const urlAPII: string = "http://localhost:3000/pedidos"; 
      const urlAPIII: string = "http://localhost:3000/usuario/get"; 
      const urlAPI: string = "http://localhost:3000/usuario/getsuyca"; 
      let user = {Email: this.session.getSession()}; 
      let usuario!: Usuario; 
      this.getusu.getusuario(urlAPIII, user).subscribe((res: any) => {
        usuario = JSON.parse(JSON.stringify(res));
        if(usuario.Tipo == "Encargado"){
          this.getusu.getusuario(urlAPI, user).subscribe((res: any) => {
            this.encargado = JSON.parse(JSON.stringify(res));
            this.flagencargado = true; 
            console.log(this.encargado); 
          });
        }
      });

      this.getusu.getusuario(urlAPII, this.id).subscribe((res: any) => {
        this.pedidos = JSON.parse(JSON.stringify(res)); 
        this.tamano = this.pedidos.length; 
        this.NoPagados = this.separarpedidos();
      });
    }
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
}
