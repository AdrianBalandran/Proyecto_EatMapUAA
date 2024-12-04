import { Component } from '@angular/core';
import { UsuariosGetService } from '../service/usuarios-get.service';
import { Usuario } from '../Interface/usuario';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionManagementService } from '../service/session-management.service';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  private usuarios!: Usuario[]; 
  private crear = true; 
  error: String = ""; 

  urlAPI: string = "http://localhost:3000/usuarios"; 

  constructor(private getusu: UsuariosGetService, private router: Router, private session: SessionManagementService){
    this.getusuarios(); 
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
  });


  getusuarios(): void {
    const urlAPI: string = "http://localhost:3000/usuarios"; 

    this.getusu.getJSON(urlAPI).subscribe((res: any) => {
      this.usuarios = JSON.parse(JSON.stringify(res));
    });
  }

  comprobarUsuario(): boolean{
    if(this.registroForm.invalid){
      this.error = "Los datos son incorrectos."; 
      return false; 
    }
    for(let usu of this.usuarios){
      if(usu.Email == this.registroForm?.get('correo')?.value!){
        // console.log("No se puede crear la cuenta");
        this.crear = false;  
        this.error = "El correo ya fue utilizado."; 
      }
    }
    if(this.crear){
      const urlAPISend: string = "http://localhost:3000/usuario/nuevo"; 
      const user: Usuario = {
        Id_Usuario: Number(this.usuarios[this.usuarios.length-1].Id_Usuario) +1, 
        Nombre: this.registroForm?.get('nombre')?.value!,
        Primer_Apellido: this.registroForm?.get('primape')?.value!,
        Segundo_Apellido: this.registroForm?.get('segape')?.value!, 
        Email: this.registroForm?.get('correo')?.value!, 
        Contrasena: this.registroForm?.get('contra')?.value!, 
        Telefono: this.registroForm?.get('telefono')?.value!,
        Tipo: "Cliente", 
        Id_Cafeteria: 0,
        Id_Sucursal: 0,
      }

      this.session.endSession(); 
      this.session.setSession(this.registroForm?.get('correo')?.value!, this.registroForm?.get('nombre')?.value!);
      this.getusu.postNode(urlAPISend, user);
      this.router.navigate(['/vistaprod']);  
    }
    return false; 
  }
}
