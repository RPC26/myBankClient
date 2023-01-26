import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOperacion } from 'src/app/model/operacion-interface';
import { IUsuario } from 'src/app/model/usuario-interface';
import { OperacionService } from 'src/app/servicio/operacion.service';

@Component({
  selector: 'app-operacion-view-admin-routed',
  templateUrl: './operacion-view-admin-routed.component.html',
  styleUrls: ['./operacion-view-admin-routed.component.css']
})
export class OperacionViewAdminRoutedComponent implements OnInit {

    id: number = 0;
    oIOperacion: IOperacion = null;

    constructor(
      private oActivatedRoute: ActivatedRoute,
      private oOperacionService: OperacionService,
    ) {
      this.id = oActivatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
      this.getOne();
    }

    getOne() {
      this.oOperacionService.getOne(this.id).subscribe({
        next: (data: IOperacion) => {
          this.oIOperacion = data;
          console.log(data);
        }
      })
    }

}
