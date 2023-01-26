import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { faEye, faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { IOperacion, IOperacionPage } from 'src/app/model/operacion-interface';
import { OperacionService } from 'src/app/servicio/operacion.service';
declare let bootstrap: any;

@Component({
    selector: 'app-operacion-plist-admin-routed',
    templateUrl: './operacion-plist-admin-routed.component.html',
    styleUrls: ['./operacion-plist-admin-routed.component.css']
})
export class OperacionPlistAdminRoutedComponent implements OnInit {

    private pListContent!: IOperacion[];
    public userPage: IOperacionPage;
    private pagesCount!: number;
    private numberPage: number = 0;
    private size: number = 5;
    protected filter: string = "";

    private sortField: string = "";
    private sortDirection: string = "";

    protected tipoOperacionFilter: number = 0;
    protected cuentaEmisorFilter: number = 0;
    protected cuentaReceptorFilter: number = 0;

    faEye = faEye;
    faUserPen = faUserPen;
    faTrash = faTrash;

    generateModal: any;
    generateModalTitle: string = "";
    generateModalId: string = "modalGenerate";
    generateModalContent: string = "";
    

    constructor(private oOperacionService: OperacionService
    ) {

    }

    ngOnInit(): void {
        this.getPage();
    }

    getPage(): void {
        this.oOperacionService.getPage(this.numberPage, this.size, this.filter, this.tipoOperacionFilter,this.cuentaEmisorFilter,this.cuentaReceptorFilter, this.sortField, this.sortDirection)
            .subscribe({
                next: (data: IOperacionPage) => {
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
        return this.oOperacionService.generate(amount).subscribe(
            {
                next: (data: number) => {
                    //modal
                    this.generateModalTitle = "MyBank"
                    this.generateModalContent = `Total de Operacions: ${data}`
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

    getPageContent(): IOperacion[] {
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

    setFilterByTipoOperacion(id: number) {
        this.tipoOperacionFilter = id;
        this.numberPage = 0;
        this.getPage();
    }
//this.cuentaEmisorFilter,this.cuentaReceptorFilter,
    setFilterByCuentaEmisor(id: number) {
        this.cuentaEmisorFilter = id;
        this.numberPage = 0;
        this.getPage();
    }

    setFilterByCuentaReceptor(id: number) {
        this.cuentaReceptorFilter = id;
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
