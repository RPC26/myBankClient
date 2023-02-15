import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEye, faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ICuenta, ICuentaPage } from 'src/app/model/cuenta-interface';
import { IOperacion, IOperacionPage } from 'src/app/model/operacion-interface';
import { CuentaService } from 'src/app/servicio/cuenta.service';
import { OperacionService } from 'src/app/servicio/operacion.service';
import { SessionService } from 'src/app/servicio/session.service';

declare let bootstrap: any

@Component({
  selector: 'app-operacion-plist-unrouted',
  templateUrl: './operacion-plist-unrouted.component.html',
  styleUrls: ['./operacion-plist-unrouted.component.css']
})
export class OperacionPlistUnroutedComponent implements OnInit {

  private pListContent!: IOperacion[];
    public userPage: IOperacionPage;
    private pagesCount!: number;
    private numberPage: number = 0;
    private size: number = 5;
    protected filter: string = "";
    totalRegisters: number

    @Input() sortField: string = "";
    @Input() sortDirection: string = "";

    @Input() idCuentaFilter: number = 76;

    faEye = faEye;
    faUserPen = faUserPen;
    faTrash = faTrash;

    generateModal: any;
    generateModalTitle: string = "";
    generateModalId: string = "modalGenerate";
    generateModalContent: string = "";
    
    constructor(private oOperacionService: OperacionService) {
    }
    
    ngOnInit(): void {
        this.getPage();
    }

    getPage(): void {
        this.oOperacionService.getPage(this.numberPage, this.size, this.filter, 0,this.idCuentaFilter,0, this.sortField, this.sortDirection)
            .subscribe({
                next: (data: IOperacionPage) => {
                    this.userPage = data;
                    this.totalRegisters = data.totalElements
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
