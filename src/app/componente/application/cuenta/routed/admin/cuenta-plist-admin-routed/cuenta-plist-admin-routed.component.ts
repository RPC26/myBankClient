import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { faEye, faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { ICuenta, ICuentaPage } from 'src/app/model/cuenta-interface';
import { CuentaService } from 'src/app/servicio/cuenta.service';
declare let bootstrap: any;

@Component({
    selector: 'app-cuenta-plist-admin-routed',
    templateUrl: './cuenta-plist-admin-routed.component.html',
    styleUrls: ['./cuenta-plist-admin-routed.component.css']
})
export class CuentaPlistAdminRoutedComponent implements OnInit {

    private pListContent!: ICuenta[];
    public userPage: ICuentaPage;
    private pagesCount!: number;
    private numberPage: number = 0;
    private size: number = 5;
    protected filter: string = "";

    private sortField: string = "";
    private sortDirection: string = "";

    protected tipocuentaFilter: number = 0;
    protected idUsuarioFilter: number = 0;

    faEye = faEye;
    faUserPen = faUserPen;
    faTrash = faTrash;

    generateModal: any;
    generateModalTitle: string = "";
    generateModalId: string = "modalGenerate";
    generateModalContent: string = "";
    

    constructor(private oCuentaService: CuentaService
    ) {

    }

    ngOnInit(): void {
        this.getPage();
    }

    getPage(): void {
        this.oCuentaService.getPage(this.numberPage, this.size, this.filter, this.tipocuentaFilter,this.idUsuarioFilter, this.sortField, this.sortDirection)
            .subscribe({
                next: (data: ICuentaPage) => {
                    this.userPage = data;
                    this.pListContent = data.content;
                    console.log(this.pListContent);
                    this.pagesCount = data.totalPages;
                    this.numberPage = data.number;
                    console.log("pagina", this.numberPage);
                },
                error: (error: HttpErrorResponse) => {
                    console.log(error);
                    console.log(error.status, error.statusText);
                }
            });
    }

    generate(amount: number) {
        return this.oCuentaService.generate(amount).subscribe(
            {
                next: (data: number) => {
                    //modal
                    this.generateModalTitle = "MyBank"
                    this.generateModalContent = `Total de cuentas: ${data}`
                    this.showModal();
                    console.log(data)
                    this.getPage();
                }
            }
        );
    }

    showModal = () => {
        this.generateModal = new bootstrap.Modal(document.getElementById(this.generateModalId), {keyboard: false})
        this.generateModal.show()
      }

    getPageContent(): ICuenta[] {
        return this.pListContent;
    }

    getPageNumber(): number {
        return this.numberPage;
    }

    getpagesCount(): number {
        return this.pagesCount;
    }

    setPage(e: number) {
        this.numberPage = e - 1;
        this.getPage();
    }

    getPageRegister(): number {
        return this.size;
    }

    setRpp(registerPage: number) {
        this.size = registerPage;
        this.numberPage = 0;
        this.getPage();
    }

    setFilter(filter: string): void {
        this.filter = filter;
        this.numberPage = 0;
        this.getPage();
    }

    setFilterByTipocuenta(id: number) {
        this.tipocuentaFilter = id;
        this.numberPage = 0;
        this.getPage();
    }

    setFilterByUsuario(id: number) {
        this.idUsuarioFilter = id;
        this.numberPage = 0;
        this.getPage();
    }

    setOrder(order: string) {
        this.sortField = order;
        if (this.sortDirection == "asc") {
            this.sortDirection = "desc";
        } else {
            this.sortDirection = "asc";
        }
        this.getPage();
    }

}
