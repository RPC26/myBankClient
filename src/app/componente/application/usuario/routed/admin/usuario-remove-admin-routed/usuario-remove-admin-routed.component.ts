import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IUsuario } from 'src/app/model/usuario-interface';
import { UsuarioService } from 'src/app/servicio/usuario.service';

declare let bootstrap: any;

@Component({
    selector: 'app-resolution-remove-admin-routed',
    templateUrl: './usuario-remove-admin-routed.component.html',
    styleUrls: ['./usuario-remove-admin-routed.component.css']
})
export class UsuarioRemoveAdminRoutedComponent implements OnInit {

    id: number = 0;
    oIUsuario: IUsuario = null;
    msg: string = "";

    constructor(
        protected oLocation: Location,
        private oActivatedRoute: ActivatedRoute,
        private oUsuarioService: UsuarioService
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

    removeOne() {
        this.oUsuarioService.removeOne(this.id).subscribe({
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
