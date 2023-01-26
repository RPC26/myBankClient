import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICuenta } from 'src/app/model/cuenta-interface';
import { IUsuario } from 'src/app/model/usuario-interface';
import { CuentaService } from 'src/app/servicio/cuenta.service';

@Component({
  selector: 'app-cuenta-view-admin-routed',
  templateUrl: './cuenta-view-admin-routed.component.html',
  styleUrls: ['./cuenta-view-admin-routed.component.css']
})
export class CuentaViewAdminRoutedComponent implements OnInit {

    id: number = 0;
    oICuenta: ICuenta = null;

    constructor(
      private oActivatedRoute: ActivatedRoute,
      private oCuentaService: CuentaService,
    ) {
      this.id = oActivatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
      this.getOne();
    }

    getOne() {
      this.oCuentaService.getOne(this.id).subscribe({
        next: (data: ICuenta) => {
          this.oICuenta = data;
          console.log(data);
        }
      })
    }

}
