import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UsuarioClass} from './usuario.class';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  registro(usuario: UsuarioClass): Observable<any> {

    const url = environment.domain_url +  'usuario/insertar';
    let datos = {
      "USU_NOMBRES": usuario.USU_NOMBRES,   
      "USU_DNI": usuario.USU_DNI,
      "USU_APELLIDOS": usuario.USU_APELLIDOS,
      "USU_EMAIL": usuario.USU_EMAIL,
      "USU_ALIAS": usuario.USU_ALIAS,
      "USU_CONTRASENIA": usuario.USU_CONTRASENIA,
      "USU_DIRECCION": usuario.USU_DIRECCION,
      "USU_SEXO": usuario.USU_SEXO,
      "USU_FECH_NAC": usuario.USU_FECH_NAC
    }
    return this.http.post<any>(url, datos).pipe(
      retry(2)
    );
  }

  login(usuAlias: string, usuContrasena: string): Observable<any> {
    const url = environment.domain_url +  'usuario/login';
    let usuario = { "USU_ALIAS": usuAlias, "USU_CONTRASENIA": usuContrasena }

    return this.http.post<any>(url, usuario).pipe(
      retry(2)
    );
  }

}
