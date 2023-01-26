import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CuentaService } from 'src/app/servicio/cuenta.service';
import { ICuenta } from 'src/app/model/cuenta-interface';

declare let bootstrap: any;

@Component({
    selector: 'app-cuenta-remove-admin-routed',
    templateUrl: './cuenta-remove-admin-routed.component.html',
    styleUrls: ['./cuenta-remove-admin-routed.component.css']
})
export class CuentaRemoveAdminRoutedComponent implements OnInit {

    id: number = 0;
    oICuenta: ICuenta = null;
    msg: string = "";

    constructor(
        protected oLocation: Location,
        private oActivatedRoute: ActivatedRoute,
        private oCuentaService: CuentaService
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

    removeOne() {
        this.oCuentaService.removeOne(this.id).subscribe({
            next: (data: number) => {
                this.msg = "Usuario " + this.id + " removed";
                const myModal = new bootstrap.Modal('#removeInfo', {
                    keyboard: false
                  })
                  myModal.show();        
                  this.oLocation.back();
            }
        })
    }
}
