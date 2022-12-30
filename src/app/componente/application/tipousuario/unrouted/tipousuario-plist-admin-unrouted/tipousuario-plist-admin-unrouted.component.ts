import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITipoUsuario, TipoUsuarioResponse } from 'src/app/model/tipousuario-interface';
import { TipoUsuarioService } from 'src/app/servicio/tipousuario.service';

@Component({
  selector: 'app-tipousuario-plist-admin-unrouted',
  templateUrl: './tipousuario-plist-admin-unrouted.component.html',
  styleUrls: ['./tipousuario-plist-admin-unrouted.component.css']
})
export class TipoUsuarioPlistAdminRoutedComponent implements OnInit {

  constructor( private oTipoUsuarioService: TipoUsuarioService  ) { }

  @Output() tipousuarioSelected = new EventEmitter<number>();
  private pListContent!: ITipoUsuario[];
  private pagesCount!: number;
  private numberPage : number= 0;
  private pageRegister: number = 5;

  ngOnInit(): void {
    this.getPlist();
  }

  setSelectedTipoUsuario = (id: number) => {
    this.tipousuarioSelected.emit(id)
  }

  getPlist(){
    this.oTipoUsuarioService.getUsersTypePlist(this.numberPage, this.pageRegister)
    .subscribe({
      next: (resp : TipoUsuarioResponse) =>{
        this.pListContent = resp.content;
        this.pagesCount = resp.totalPages;
      },
      error: (err: HttpErrorResponse) =>{
        console.log(err);
      }
    })
  }

  getPlistContent(): ITipoUsuario[]{
    return this.pListContent;
  }

  getpagesCount(): number{
    return this.pagesCount;
  }

  getNumberPage( e: number ){
    this.numberPage = e;
    this.getPlist();
  }

  getPageRegister():number{
    return this.pageRegister;
  }

  setPageRegister( registerPage: number ){
    this.pageRegister = registerPage;
    this.getPlist();
  }

}
