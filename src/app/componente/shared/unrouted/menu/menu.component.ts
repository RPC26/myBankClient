import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/servicio/session.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  strUserName: string = "";

  constructor(private oSessionService: SessionService) { }

  ngOnInit() {
    

  }

  logout () {
    this.oSessionService.logout().subscribe(
      {
        next: () => console.log("logged out")
      }
    )
  }

}
