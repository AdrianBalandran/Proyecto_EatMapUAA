import { Injectable } from '@angular/core';
import { Usuario } from '../Interface/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosGetService {
  urlAPI: string = "http://148.211.74.101:3000/usuarios"; 
  
  constructor(private http: HttpClient) { }

  getJSON(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
  postNode(url: string, users: Usuario){
    this.http.post(url, users).subscribe(); 
  }

  getusuario(url: string, user: any): any {
    return this.http.post<any>(url, user);
  }
  
}
