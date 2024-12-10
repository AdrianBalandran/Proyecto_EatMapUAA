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
    let params = new HttpParams().set('tipo', tipo);
    if (query.trim()) {
      params = params.set('query', query.trim());
    }
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
