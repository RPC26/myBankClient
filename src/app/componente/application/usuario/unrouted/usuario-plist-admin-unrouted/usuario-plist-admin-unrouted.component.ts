import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUsuario, IUsuarioPage } from 'src/app/model/usuario-interface';
import { UsuarioService } from 'src/app/servicio/usuario.service';
declare let bootstrap: any;

@Component({
  selector: 'app-usuario-plist-admin-unrouted',
  templateUrl: './usuario-plist-admin-unrouted.component.html',
  styleUrls: ['./usuario-plist-admin-unrouted.component.css']
})
export class UsuarioPlistAdminUnRoutedComponent implements OnInit {



  constructor(private oUsuarioService: UsuarioService) { }


  @Output() usuarioSelected = new EventEmitter<number>();
  @Output() usuarioNombre = new EventEmitter<string>();
  private pListContent!: IUsuario[];
  public userPage: IUsuarioPage;
  private pagesCount!: number;
  private numberPage: number = 0;
  private size: number = 5;
  protected filter: string = "";

  private sortField: string = "";
  private sortDirection: string = "";

  protected tipousuarioFilter: number = 0;

  generateModal: any;
  generateModalTitle: string = "";
  generateModalId: string = "modalGenerate";
  generateModalContent: string = "";

  ngOnInit(): void {
    this.getPage();
  }

  setSelectedUsuario = (id: number) => {
    this.usuarioSelected.emit(id)
  }

  setSelectedUsuarioNombre = (nombre: string) => {
    this.usuarioNombre.emit(nombre)
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

  showModal = () => {
    this.generateModal = new bootstrap.Modal(document.getElementById(this.generateModalId), { keyboard: false })
    this.generateModal.show()
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
    this.numberPage = 0;
    this.getPage();
  }

  setFilter(filter: string): void {
    this.filter = filter;
    this.numberPage = 0;
    this.getPage();
  }

  setFilterByTipousuario(id: number) {
    this.tipousuarioFilter = id;
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
