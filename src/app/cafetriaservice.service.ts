import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root', // Esto garantiza que Angular lo inyecte correctamente
})
export class CafeteriaService {
  constructor(private http: HttpClient) {}
  getCafeteriaInfo(idCafeteria: number): Observable<any> {
    return this.http.post<any>(
      'http://192.168.50.39:3000/cafeteriaid',
      { Id_Cafeteria: idCafeteria }
    );
  }
}

