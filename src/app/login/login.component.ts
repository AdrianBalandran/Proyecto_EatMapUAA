import { Component, ElementRef, ViewChild } from '@angular/core';
import { UsuariosGetService } from '../service/usuarios-get.service';
import { Usuario } from '../Interface/usuario';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SessionManagementService } from '../service/session-management.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    private usuarios!: any; 
    private data: any[] | undefined
    @ViewChild('passwordInput', { static: true }) passwordInput!: ElementRef<HTMLInputElement>;
    isPasswordVisible = false;
  
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
      const inputType = this.isPasswordVisible ? 'text' : 'password';
      this.passwordInput.nativeElement.type = inputType;
    }

    private user!: Usuario[]; 
    @Injectable() 

    correo!: String; 
    contra!: String; 
    error: String = ""; 

    urlAPI: string = "http://localhost:3000/usuarios"; 

    constructor(private getusu: UsuariosGetService, private router: Router, private session: SessionManagementService, private titleser: Title){
      titleser.setTitle("EatMapUAA | Iniciar Sesión")
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
  

    getconsole(): void{
      console.log(this.usuarios);
      // console.log(this.usuarios.length);
      console.log(this.loginForm?.get('email')?.value); 
      console.log(this.loginForm?.get('contras')?.value); 
    }

    comprobarUsuario(){
      if(this.loginForm.invalid){
        this.error = "Los datos son incorrectos."; 
        return; 
      }
      
      this.correo = this.loginForm?.get('email')?.value!;
      this.contra = this.loginForm?.get('contras')?.value!;

      const urlAPI: string = "http://localhost:3000/login"; 
      this.getusu.getusuario(urlAPI, {Correo: this.correo, Contrasena: this.contra}).subscribe((res: any) => {
        this.usuarios = JSON.parse(JSON.stringify(res));
        console.log(this.usuarios); 
        if(this.usuarios.success){
          this.session.endSession(); 
          this.session.setSession(this.correo, this.usuarios.usuario.Nombre, this.usuarios.usuario.Id_Usuario);
          if(this.usuarios.usuario.Tipo != "Cliente"){
            this.router.navigate(['/usuario']);  
          }else{
            this.router.navigate(['/vistaprod']);  
          }
          this.error = "Correcto";
        }
      }, (err: { message: String; }) => { 
        this.error = "Usuario o contraseña incorrecto.";
      });

    }

    


}
