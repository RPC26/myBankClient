import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject, Subscription } from 'rxjs';
import { BASE_URL, HTTP_OPTIONS } from 'src/environments/environment';
import { IUsuario } from '../model/usuario-interface';
import { CryptoService } from './crypto.service';
import { DecodeService } from './decode.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private entityURL = '/session';
  sURL: string = `${BASE_URL}${this.entityURL}`;
  subject = new Subject<any>();

  constructor(private http: HttpClient, private oDecodeService: DecodeService, private oCryptoService: CryptoService,) { }

  login(user: string, password: string): Observable<string> {
    const loginData = { login: user, password: this.oCryptoService.getSHA256(password) };
    return this.http.post<string>(this.sURL, loginData, HTTP_OPTIONS);
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  getUserName(): string {
    if (!this.isSessionActive()) {
        return "";
    } else {
        let token: string = localStorage.getItem("token");
        return this.oDecodeService.decode(token).name;
    }
}

  isSessionActive(): Boolean {
    let strToken: string = localStorage.getItem("token");
    if (strToken) {
      let oDecodedToken = this.oDecodeService.decode(strToken);
      if (Date.now() >= oDecodedToken.exp * 1000) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  logout() {
    return localStorage.removeItem("token");
  }

  on(event: Events, action: any): Subscription {
    return this.subject
      .pipe(
        filter((e: EmitEvent) => {
          return e.name === event;
        }),
        map((e: EmitEvent) => {
          return e.value;
        })
      )
      .subscribe(action);
  }

  emit(event: EmitEvent) {
    this.subject.next(event);
  }

}

export class EmitEvent {
  constructor(public name: any, public value?: any) {}
}

// this works like a communication channel
export enum Events {
  login,
  logout
}