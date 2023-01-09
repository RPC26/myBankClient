import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, HTTP_OPTIONS } from 'src/environments/environment';
import { IUsuario, IUsuarioUpdate, IUsuarioPage, IUsuarioCreate } from '../model/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private entityURL = '/usuario';
  url: string = ""

  constructor(private oHttp: HttpClient) {
    this.url = `${BASE_URL}${this.entityURL}`;
  }

getPage(page: number, size: number, filter: string, id_tipousuario: number, strSortField: string, strOrderDirection: string): Observable<IUsuarioPage> {
  let params = new HttpParams()
    .set("filter", filter)
    .set("page", page)
    .set("size", size);
  let url: string = `${BASE_URL}${this.entityURL}`;

  if (id_tipousuario != 0) {
    params = params.set("tipousuario", id_tipousuario);
  }

  if (strSortField != "") { //&sort=codigo,[asc|desc]
    if (strOrderDirection != "") {
      params = params.set("sort", strSortField + "," + strOrderDirection);
    } else {
      params = params.set("sort", strSortField);
    }
  }

  const  { headers, withCredentials } = HTTP_OPTIONS

  return this.oHttp.get<IUsuarioPage>(url, { headers: headers, withCredentials, params });
}

getOne(id: number): Observable<IUsuario> {
  return this.oHttp.get<IUsuario>(`${this.url}/${id}`, HTTP_OPTIONS);
}

removeOne(id: number): Observable<number> {
  return this.oHttp.delete<number>(`${this.url}/${id}`, HTTP_OPTIONS);
}

newOne(oUsuarioCreate: IUsuarioCreate): Observable<number> {       
  return this.oHttp.post<number>(this.url, oUsuarioCreate, HTTP_OPTIONS);
}

updateOne(oUsuario2Send: IUsuarioUpdate): Observable<number> {
  return this.oHttp.put<number>(this.url, oUsuario2Send, HTTP_OPTIONS);
}

generate(amount: number): Observable<number> {
  return this.oHttp.post<number>(`${this.url}/generate/${amount}`, null, HTTP_OPTIONS)
}

}

