import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  private baseUrl = 'http://localhost:3000'; // URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para buscar comidas
  buscarComidas(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/comidasxingredientes`, {
      params: { ingredientes: query },
    });
  }

  // Método para buscar menús
  buscarMenus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/menus`);
  }
}
