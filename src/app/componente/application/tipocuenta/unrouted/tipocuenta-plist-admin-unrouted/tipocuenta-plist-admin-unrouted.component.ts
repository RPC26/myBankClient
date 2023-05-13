import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITipocuenta, TipoCuentaResponse } from 'src/app/model/tipocuenta-interface';
import { TipoCuentaService } from 'src/app/servicio/tipocuenta.service';

@Component({
  selector: 'app-tipocuenta-plist-admin-unrouted',
  templateUrl: './tipocuenta-plist-admin-unrouted.component.html',
  styleUrls: ['./tipocuenta-plist-admin-unrouted.component.css']
})
export class TipoCuentaPlistAdminUnRoutedComponent implements OnInit {

  constructor( private oTipoCuentaService: TipoCuentaService  ) { }

  @Output() tipocuentaSelected = new EventEmitter<number>();
  @Output() tipocuentaNombre = new EventEmitter<string>();
  private pListContent!: ITipocuenta[];
  private pagesCount!: number;
  private numberPage : number= 0;
  private pageRegister: number = 5;

  ngOnInit(): void {
    this.getPlist();
  }

  setSelectedTipoCuenta = (id: number) => {
    this.tipocuentaSelected.emit(id)
  }

  setSelectedTipoCuentaNombre = (nombre: string) => {
    this.tipocuentaNombre.emit(nombre)
  }

  getPlist(){
    this.oTipoCuentaService.getTipoCuentaPlist(this.numberPage, this.pageRegister)
    .subscribe({
      next: (resp : TipoCuentaResponse) =>{
        this.pListContent = resp.content;
        this.pagesCount = resp.totalPages;
      },
      error: (err: HttpErrorResponse) =>{
        console.log(err);
      }
    })
  }

  getPlistContent(): ITipocuenta[]{
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
