import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  private baseUrl = 'http://localhost:3000'; // URL del backend

  constructor(private http: HttpClient) {}

 buscarGeneral(query: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/buscar`, { params: { query } });
}
}
