import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

import { Usuario } from '../modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ServiciosUsuario {

  url: string;
  arregloUsuarios: Usuario[];

  constructor(private http: HttpClient) { }

  consultarUsuarios(): Observable<Usuario[]>{

    return this.http.get<Usuario[]>(`${environment.apiBackend}/usuarios`);
  }

  cosultarUsuarioPorId(id:number): Observable<Usuario>{

    return this.http.get<Usuario>(`${environment.apiBackend}/usuarios?id=${id}`);
  }

  crearUsuario(usuario: Usuario): Observable<Usuario>{

    return this.http.post<Usuario>(`${environment.apiBackend}/usuarios`, usuario);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario>{

    return this.http.put<Usuario>(`${environment.apiBackend}/usuarios/${usuario.id}`, usuario);
  }

  eliminarUsuario(id:number): Observable<any>{

    return this.http.delete(`${environment.apiBackend}/usuarios/${id}`);
  }

  cosultarUsuarioPorNombre(nombre:string): Observable<Usuario[]>{

    return this.http.get<Usuario[]>(`${environment.apiBackend}/usuarios?nombre=${nombre}`);
  }
}
