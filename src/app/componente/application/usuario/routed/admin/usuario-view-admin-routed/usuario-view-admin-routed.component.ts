import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from 'src/app/model/usuario-interface';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-usuario-view-admin-routed',
  templateUrl: './usuario-view-admin-routed.component.html',
  styleUrls: ['./usuario-view-admin-routed.component.css']
})
export class UsuarioViewAdminRoutedComponent implements OnInit {

    id: number = 0;
    oIUsuario: IUsuario = null;

    constructor(
      private oActivatedRoute: ActivatedRoute,
      private oUsuarioService: UsuarioService,
    ) {
      this.id = oActivatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
      this.getOne();
    }

    getOne() {
      this.oUsuarioService.getOne(this.id).subscribe({
        next: (data: IUsuario) => {
          this.oIUsuario = data;
          console.log(data);
        }
      })
    }

}
