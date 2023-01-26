import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';
import { TipooperacionResponse } from '../model/tipooperacion-interface';

@Injectable({
  providedIn: 'root'
})
export class TipooperacionService {

  constructor( private oHttp : HttpClient ) { }

  private entityURL: string = "/tipooperacion";


  getTipoOperacionPlist(page: number, size: number): Observable<TipooperacionResponse>{
    let params = new HttpParams()
    .set("page", page)
    .set("size", size);

    const url : string = `${BASE_URL}${this.entityURL}`;
    return this.oHttp.get<TipooperacionResponse>(url,{params: params});
  }
}
