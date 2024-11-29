import { Component } from '@angular/core';
import { UsuariosGetService } from '../service/usuarios-get.service';
import { Usuario } from '../Interface/usuario';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    private usuarios!: Usuario[]; 
    private data: any[] | undefined
    urlAPI: string = "http://localhost:3000/usuarios"; 

    constructor(private getusu: UsuariosGetService){
    }
 
    getusuarios(): void {
      const urlAPI: string = "http://localhost:3000/usuarios"; 
      console.log(this.urlAPI);

      this.getusu.getJSON(urlAPI).subscribe((res: any) => {
        this.usuarios = JSON.parse(JSON.stringify(res));
      });
    }

    getconsole(): void{
      console.log(this.usuarios);
      console.log(this.usuarios[0].Contrasena)
      console.log(this.usuarios[0].Id_Usuario)
      console.log(this.usuarios[3].Nombre)

    }


}
