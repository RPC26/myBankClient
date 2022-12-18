import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/environment';
import { IUsuario } from '../model/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8'
    }),
    withCredentials: true
};

  login(user: string, password: string) {
    const loginData = JSON.stringify({login: user, password: password})
    return this.http.post(BASE_URL + "/session", loginData, this.httpOptions)
  }

  logout() {
    return this.http.delete(BASE_URL + "/session", this.httpOptions)
  }

  test(id: number) {
    return this.http.get<IUsuario>(BASE_URL + "/usuario/" + id, this.httpOptions)
  }
}
