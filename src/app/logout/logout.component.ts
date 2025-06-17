import { Component } from '@angular/core';
import { UsuariosGetService } from '../service/usuarios-get.service';
import { Usuario } from '../Interface/usuario';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionManagementService } from '../service/session-management.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  private response!: any; 
  private crear = true; 
  error: String = ""; 

  urlAPI: string = "http://localhost:3000/usuarios"; 

  constructor(private getusu: UsuariosGetService, private router: Router, private session: SessionManagementService, private titleser: Title){
    titleser.setTitle("EatMapUAA | Registro")
  }

  registroForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required, 
      Validators.minLength(3)
    ]),
    primape: new FormControl('', [
      Validators.required, 
      Validators.minLength(3)
    ]),
    segape: new FormControl('', [
      Validators.required, 
      Validators.minLength(3)
    ]),
    correo: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    telefono: new FormControl('', [
      Validators.required, 
      Validators.minLength(10)
      // Validators.pattern('^[- +()0-9]+$')
    ]),
    contra: new FormControl('', [
      Validators.required, 
      Validators.minLength(3)
    ]),  
    contra2: new FormControl('', [
      Validators.required, 
      Validators.minLength(3)
    ])
  });



  comprobarUsuario(): boolean{
    if(this.registroForm.invalid){
      this.error = "Los datos son incorrectos."; 
      return false; 
    }

    if(this.registroForm.value.contra2 != this.registroForm.value.contra){
      this.error = "Las contraseñas no coinciden.";
      return false;
    }

    if(this.crear){
      const urlAPISend: string = "http://localhost:3000/usuarios/crear"; 
      const user: Usuario = {
        Id_Usuario: 0, 
        Nombre: this.registroForm?.get('nombre')?.value!,
        Primer_Apellido: this.registroForm?.get('primape')?.value!,
        Segundo_Apellido: this.registroForm?.get('segape')?.value!, 
        Email: this.registroForm?.get('correo')?.value!, 
        Contrasena: this.registroForm?.get('contra')?.value!,  
        Telefono: this.registroForm?.get('telefono')?.value!,
        Tipo: "C", 
      }

      this.getusu.getusuario(urlAPISend, user).subscribe((res: any) => {
        this.response = JSON.parse(JSON.stringify(res));
        console.log(this.response); 
        if (this.response.success) {
  this.session.endSession(); 
  
  const usuario = this.response.usuario;

  const tokenData = {
    id: usuario.Id_Usuario,
    email: usuario.Email,
    nombre: usuario.Nombre,
    tipo: usuario.Tipo,
    iat: new Date().getTime()
  };

  const tokenStr = JSON.stringify(tokenData);
  const token = btoa(tokenStr);

  // Guardar sesión completa
  this.session.setSession(usuario.Email, usuario.Nombre, usuario.Id_Usuario, token);

  this.router.navigate(['/home']);
}

      }, (err: { message: String; }) => { 
        this.error = "Ya se ha utilizado este correo.";
      });
      
    }
    return false; 
  }
}
