import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { faEye, faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IUsuario, IUsuarioPage } from 'src/app/model/usuario-interface';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
    selector: 'app-usuario-plist-admin-routed',
    templateUrl: './usuario-plist-admin-routed.component.html',
    styleUrls: ['./usuario-plist-admin-routed.component.css']
})
export class UsuarioPlistAdminRoutedComponent implements OnInit {

    private pListContent!: IUsuario[];
    public userPage: IUsuarioPage;
    private pagesCount!: number;
    private numberPage: number = 0;
    private size: number = 5;
    protected filter: string = "";

    private sortField: string = "";
    private sortDirection: string = "";

    protected tipousuarioFilter: number = 0;

    faEye = faEye;
    faUserPen = faUserPen;
    faTrash = faTrash;

    constructor(
        private oUsuarioService: UsuarioService
    ) {

    }

    ngOnInit(): void {
        this.getPage();
    }

    getPage(): void {
        this.oUsuarioService.getPage(this.numberPage, this.size, this.filter, this.tipousuarioFilter, this.sortField, this.sortDirection)
            .subscribe({
                next: (data: IUsuarioPage) => {
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

    getPageContent(): IUsuario[] {
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
        this.getPage();
    }

    setFilter(filter: string): void {
        this.filter = filter;
        this.numberPage = 0;
        this.getPage();
    }

    setFilterByTipousuario(id: number) {
        this.tipousuarioFilter = id;
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
