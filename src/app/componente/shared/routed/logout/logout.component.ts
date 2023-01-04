import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmitEvent, Events, SessionService } from 'src/app/servicio/session.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private oSessionService: SessionService,
    private oRouter: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.oRouter.navigate(['/home'])
    this.oSessionService.logout();
    this.oSessionService.emit(new EmitEvent(Events.logout, ""));
  }

}
