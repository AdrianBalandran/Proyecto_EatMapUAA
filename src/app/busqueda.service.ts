import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  private apiUrl = 'http://localhost:3000/buscar'; // Cambia a la URL de tu servidor

  constructor(private http: HttpClient) {}

  buscar(query: string, tipo: string): Observable<any[]> {
    const params = new HttpParams().set('query', query).set('tipo', tipo);
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
