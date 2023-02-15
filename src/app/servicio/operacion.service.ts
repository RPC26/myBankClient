import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, HTTP_OPTIONS } from 'src/environments/environment';
import { IOperacionesAñoCount } from '../model/dashboard-interface';
import { IOperacion, IOperacionCreate, IOperacionPage, IOperacionUpdate } from '../model/operacion-interface';

@Injectable({
  providedIn: 'root'
})
export class OperacionService {
  private entityURL = '/operacion';
  url: string = ""

  constructor(private oHttp: HttpClient) {
    this.url = `${BASE_URL}${this.entityURL}`;
  }
//this.cuentaEmisorFilter,this.cuentaReceptorFilter,
getPage(page: number, size: number, filter: string, id_tipoOperacion: number, id_cuentaEmisor: number,id_cuentaReceptor: number, strSortField: string, strOrderDirection: string): Observable<IOperacionPage> {
  let params = new HttpParams()
    .set("filter", filter)
    .set("page", page)
    .set("size", size);
  let url: string = `${BASE_URL}${this.entityURL}`;

  if (id_tipoOperacion != 0) {
    params = params.set("tipoOperacion", id_tipoOperacion);
  }

  if (id_cuentaEmisor != 0) {
    params = params.set("cuentaEmisor", id_cuentaEmisor);
  }

  if (id_cuentaReceptor != 0) {
    params = params.set("cuentaReceptor", id_cuentaReceptor);
  }

  if (strSortField != "") { //&sort=codigo,[asc|desc]
    if (strOrderDirection != "") {
      params = params.set("sort", strSortField + "," + strOrderDirection);
    } else {
      params = params.set("sort", strSortField);
    }
  }

  const  { headers, withCredentials } = HTTP_OPTIONS

  return this.oHttp.get<IOperacionPage>(url, { headers: headers, withCredentials, params });
}

getOne(id: number): Observable<IOperacion> {
  return this.oHttp.get<IOperacion>(`${this.url}/${id}`, HTTP_OPTIONS);
}

getOperacionesHoy(): Observable<number> {
  return this.oHttp.get<number>(`${this.url}/operacionesHoy`, HTTP_OPTIONS);
}

getOperacionesCountGrafica(): Observable<IOperacionesAñoCount[]>{
  return this.oHttp.get<IOperacionesAñoCount[]>(`${this.url}/dashboard/operaciones`, HTTP_OPTIONS);
}

removeOne(id: number): Observable<number> {
  return this.oHttp.delete<number>(`${this.url}/${id}`, HTTP_OPTIONS);
}

newOne(oUsuarioCreate: IOperacionCreate): Observable<number> {       
  return this.oHttp.post<number>(this.url, oUsuarioCreate);
}

updateOne(oUsuario2Send: IOperacionUpdate): Observable<number> {
  return this.oHttp.put<number>(this.url, oUsuario2Send, HTTP_OPTIONS);
}

generate(amount: number): Observable<number> {
  return this.oHttp.post<number>(`${this.url}/generate/${amount}`, null, HTTP_OPTIONS)
}

}


