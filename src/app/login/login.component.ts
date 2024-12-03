import { Component } from '@angular/core';
import { UsuariosGetService } from '../service/usuarios-get.service';
import { Usuario } from '../Interface/usuario';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SessionManagementService } from '../service/session-management.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    private usuarios!: Usuario[]; 
    private data: any[] | undefined


    private user!: Usuario[]; 
    @Injectable() 

    correo!: String; 
    contra!: String; 

    urlAPI: string = "http://localhost:3000/usuarios"; 

    constructor(private getusu: UsuariosGetService, private router: Router, private session: SessionManagementService){
      this.getusuarios(); 
    }

    loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      contras: new FormControl('', [
        Validators.required, 
        Validators.minLength(3)
      ]),
    });
  

 
    getusuarios(): void {
      const urlAPI: string = "http://localhost:3000/usuarios"; 
      this.getusu.getJSON(urlAPI).subscribe((res: any) => {
        this.usuarios = JSON.parse(JSON.stringify(res));
      });
    }

    getconsole(): void{
      console.log(this.usuarios);
      console.log(this.usuarios.length);
      console.log(this.loginForm?.get('email')?.value); 
      console.log(this.loginForm?.get('contras')?.value); 
    }

    comprobarUsuario(){
      let flagUser: boolean = false; 
      this.correo = this.loginForm?.get('email')?.value!
      this.contra = this.loginForm?.get('contras')?.value!
      for(let usu of this.usuarios){
        if(usu.Email == this.correo){
          if(usu.Contrasena == this.contra){
            flagUser = true; 
          }
        }
      }
      if(flagUser){
        this.session.endSession(); 
        this.session.setSession(this.correo);
        this.router.navigate(['/home']);  
      }
    }

    


}
