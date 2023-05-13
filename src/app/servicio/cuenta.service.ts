import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, HTTP_OPTIONS } from 'src/environments/environment';
import { ICuenta, ICuentaCreate, ICuentaPage, ICuentaUpdate, IEstadoCuentas } from '../model/cuenta-interface';
import { IOperacionesAñoCount } from '../model/dashboard-interface';
import { ISaldoCuenta } from '../model/saldo-interface';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private entityURL = '/cuenta';
  url: string = ""

  constructor(private oHttp: HttpClient) {
    this.url = `${BASE_URL}${this.entityURL}`;
  }

getPage(page: number, size: number, filter: string, id_tipocuenta: number, id_usuario: number, strSortField: string, strOrderDirection: string): Observable<ICuentaPage> {
  let params = new HttpParams()
    .set("filter", filter)
    .set("page", page)
    .set("size", size);
  let url: string = `${BASE_URL}${this.entityURL}`;

  if (id_tipocuenta != 0) {
    params = params.set("tipocuenta", id_tipocuenta);
  }

  if (id_usuario != 0) {
    params = params.set("usuario", id_usuario);
  }

  if (strSortField != "") { //&sort=codigo,[asc|desc]
    if (strOrderDirection != "") {
      params = params.set("sort", strSortField + "," + strOrderDirection);
    } else {
      params = params.set("sort", strSortField);
    }
  }

  const  { headers, withCredentials } = HTTP_OPTIONS

  return this.oHttp.get<ICuentaPage>(url, { headers: headers, withCredentials, params });
}

getSaldoMisCuentas(): Observable<IOperacionesAñoCount> {
  return this.oHttp.get<IOperacionesAñoCount>(`${this.url}/saldo/misCuentas`, HTTP_OPTIONS);
}

getOne(id: number): Observable<ICuenta> {
  return this.oHttp.get<ICuenta>(`${this.url}/${id}`, HTTP_OPTIONS);
}

removeOne(id: number): Observable<number> {
  return this.oHttp.delete<number>(`${this.url}/${id}`, HTTP_OPTIONS);
}

newOne(oUsuarioCreate: ICuentaCreate): Observable<number> {       
  return this.oHttp.post<number>(this.url, oUsuarioCreate, HTTP_OPTIONS);
}

updateOne(oUsuario2Send: ICuentaUpdate): Observable<number> {
  return this.oHttp.put<number>(this.url, oUsuario2Send, HTTP_OPTIONS);
}

generate(amount: number): Observable<number> {
  return this.oHttp.post<number>(`${this.url}/generate/${amount}`, null, HTTP_OPTIONS)
}

getSaldo(id: number): Observable<ISaldoCuenta> {
  return this.oHttp.get<ISaldoCuenta>(`${this.url}/${id}/saldo`, HTTP_OPTIONS)
}

getEstadoCuentas(): Observable<IEstadoCuentas> {
  return this.oHttp.get<IEstadoCuentas>(`${this.url}/count/estado`, HTTP_OPTIONS);
}

}


