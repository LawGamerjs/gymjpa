import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Socio {
  idSocio?: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  correo: string;
  direccion: string;
  estado: string;
  foto: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  private baseUrl = 'http://localhost:8080/api/socios';

  constructor(private http: HttpClient) { }

  listar(): Observable<Socio[]> {
    return this.http.get<Socio[]>(this.baseUrl);
  }

  guardar(socio: Socio): Observable<Socio> {
    return this.http.post<Socio>(this.baseUrl, socio);
  }

  actualizar(id: number, socio: Socio): Observable<Socio> {
    return this.http.put<Socio>(`${this.baseUrl}/${id}`, socio);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}