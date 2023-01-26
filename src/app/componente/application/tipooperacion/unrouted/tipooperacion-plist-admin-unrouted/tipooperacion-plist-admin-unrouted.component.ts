import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITipooperacion, TipooperacionResponse } from 'src/app/model/tipooperacion-interface';
import { TipooperacionService } from 'src/app/servicio/tipooperacion.service';

@Component({
  selector: 'app-tipooperacion-plist-admin-unrouted',
  templateUrl: './tipooperacion-plist-admin-unrouted.component.html',
  styleUrls: ['./tipooperacion-plist-admin-unrouted.component.css']
})
export class TipoOperacionPlistAdminUnRoutedComponent implements OnInit {

  constructor( private oTipoOperacionService: TipooperacionService  ) { }

  @Output() tipoOperacionSelected = new EventEmitter<number>();
  private pListContent!: ITipooperacion[];
  private pagesCount!: number;
  private numberPage : number= 0;
  private pageRegister: number = 5;

  ngOnInit(): void {
    this.getPlist();
  }

  setSelectedTipoOperacion = (id: number) => {
    this.tipoOperacionSelected.emit(id)
  }

  

  

  getPlist(){
    this.oTipoOperacionService.getTipoOperacionPlist(this.numberPage, this.pageRegister)
    .subscribe({
      next: (resp : TipooperacionResponse) =>{
        this.pListContent = resp.content;
        this.pagesCount = resp.totalPages;
      },
      error: (err: HttpErrorResponse) =>{
        console.log(err);
      }
    })
  }

  getPlistContent(): ITipooperacion[]{
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
