import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionService } from "./session.service";


@Injectable({
  providedIn: 'root'
})
export class HttpOptionsService {

  constructor(private oSessionService: SessionService) { }

  getHttpOptions(): any {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json; charset=UTF-8');
    headers_object.append('Content-Type', 'application/json; charset=UTF-8');
    headers_object.append("Authorization", "Bearer " +this.oSessionService.getToken());
    
    const httpOptions = {
      headers: headers_object
    };


    if (this.oSessionService.isSessionActive) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8'
        }),
        withCredentials: true,
        Authorization: 'Bearer ' + this.oSessionService.getToken()
      }
    } else {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8'
        }),
        withCredentials: true
      }
    }

  }
}