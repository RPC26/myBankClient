import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISaldoCuenta, ISaldoUsuario } from 'src/app/model/saldo-interface';
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

    oISaldoUsuario: ISaldoCuenta[] = null;

    constructor(
      private oActivatedRoute: ActivatedRoute,
      private oUsuarioService: UsuarioService,
    ) {
      this.id = oActivatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
      this.getOne();
      this.getSaldo();
    }

    getSaldo() {
      this.oUsuarioService.getSaldo(this.id).subscribe({
        next: (data: ISaldoUsuario) => {
          this.oISaldoUsuario = data.cuentasUsuario;
          console.log("datasos",data)
        }
      })
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
