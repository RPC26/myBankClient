import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OperacionService } from 'src/app/servicio/operacion.service';
import { IOperacion } from 'src/app/model/operacion-interface';

declare let bootstrap: any;

@Component({
    selector: 'app-operacion-remove-admin-routed',
    templateUrl: './operacion-remove-admin-routed.component.html',
    styleUrls: ['./operacion-remove-admin-routed.component.css']
})
export class OperacionRemoveAdminRoutedComponent implements OnInit {

    id: number = 0;
    oIOperacion: IOperacion = null;
    msg: string = "";

    constructor(
        protected oLocation: Location,
        private oActivatedRoute: ActivatedRoute,
        private oOperacionService: OperacionService
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

    removeOne() {
        this.oOperacionService.removeOne(this.id).subscribe({
            next: (data: number) => {
                this.msg = "Operación " + this.id + " removed";
                const myModal = new bootstrap.Modal('#removeInfo', {
                    keyboard: false
                  })
                  myModal.show();        
                  this.oLocation.back();
            }
        })
    }
}
