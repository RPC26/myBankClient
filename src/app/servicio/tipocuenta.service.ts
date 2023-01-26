import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';
import { TipoCuentaResponse } from '../model/tipocuenta-interface';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {

  constructor( private oHttp : HttpClient ) { }

  private entityURL: string = "/tipocuenta";


  getTipoCuentaPlist(page: number, size: number): Observable<TipoCuentaResponse>{
    let params = new HttpParams()
    .set("page", page)
    .set("size", size);

    const url : string = `${BASE_URL}${this.entityURL}`;
    return this.oHttp.get<TipoCuentaResponse>(url,{params: params});
  }
}