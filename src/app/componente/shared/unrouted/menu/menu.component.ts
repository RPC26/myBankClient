import { Component, OnInit } from '@angular/core';
import { Events, SessionService } from 'src/app/servicio/session.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  strUserName: string = "";
  strUserType: string = "";

  constructor(private oSessionService: SessionService,) {
    this.strUserName = oSessionService.getUserName();
    this.strUserType = oSessionService.getUsertype();
  }

  ngOnInit() {
    this.oSessionService.on(
      Events.login, (data: any) => {
        this.strUserName = this.oSessionService.getUserName();
        this.strUserType = this.oSessionService.getUsertype();
      });
    this.oSessionService.on(
      Events.logout, (data: any) => {
        this.strUserName = '';
        this.strUserType = '';
      });
  }
  
}
