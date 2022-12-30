import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL, HTTP_OPTIONS } from 'src/environments/environment';
import { IUsuario } from '../model/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  login(user: string, password: string) {
    const loginData = JSON.stringify({login: user, password: password})
    return this.http.post(BASE_URL + "/session", loginData, HTTP_OPTIONS)
  }

  logout() {
    return this.http.delete(BASE_URL + "/session", HTTP_OPTIONS)
  }

  test(id: number) {
    return this.http.get<IUsuario>(BASE_URL + "/usuario/" + id, HTTP_OPTIONS)
  }
}
