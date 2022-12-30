import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';
import { TipoUsuarioResponse } from '../model/tipousuario-interface';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  constructor( private oHttp : HttpClient ) { }

  private entityURL: string = "/tipousuario";


  getUsersTypePlist(page: number, size: number): Observable<TipoUsuarioResponse>{
    let params = new HttpParams()
    .set("page", page)
    .set("size", size);

    const url : string = `${BASE_URL}${this.entityURL}`;
    return this.oHttp.get<TipoUsuarioResponse>(url,{params: params});
  }
}