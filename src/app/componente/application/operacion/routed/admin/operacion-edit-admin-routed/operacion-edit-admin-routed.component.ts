import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOperacion, IOperacion2Form, IOperacionCreate, IOperacionUpdate } from 'src/app/model/operacion-interface';
import { OperacionService } from 'src/app/servicio/operacion.service';
declare let bootstrap: any;
@Component({
  selector: 'app-operacion-edit-admin-routed',
  templateUrl: './operacion-edit-admin-routed.component.html',
  styleUrls: ['./operacion-edit-admin-routed.component.css']
})
export class OperacionEditAdminRoutedComponent implements OnInit {

  id: number = 0;
  oIOperacion: IOperacion = null;
  oOperacion2Form: IOperacion2Form = null;
  oOperacionUpdate: IOperacionUpdate = null;
  oForm: FormGroup<IOperacion2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  ajena: string = "ajenaModal";
  

  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oOperacionService: OperacionService,
    private oFormBuilder: FormBuilder
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getOne();
  }

  setUsario(id: number) {
    this.oForm.controls['usuario'].setValue(id);
    this.myModal.hide();
  }

  setTipoOperacion(id: number) {
    this.oForm.controls['tipoOperacion'].setValue(id);
    this.myModal.hide();
  }

  getOne() {
    this.oOperacionService.getOne(this.id).subscribe({
      next: (data: IOperacion) => {
        this.oIOperacion = data;
        console.log(data);
        this.oForm = <FormGroup>this.oFormBuilder.group({
          id: [data.id],
          tipoOperacion: [data.tipoOperacion.id, [Validators.required]],
          usuario: [data.usuario.id, Validators.required],
          iban: [data.iban],

        });
      }
    })
  }

  onSubmit() {
    console.log("onSubmit");
    this.oOperacionUpdate = {
      iban:  this.oForm.value.iban,
      tipoOperacion: { id: this.oForm.value.id_tipoOperacion},
      usuario: { id: this.oForm.value.id_usuario},
    }
    if (this.oForm.valid) {
      this.oOperacionService.updateOne(this.oOperacionUpdate).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "MYBANK";
          this.modalContent = "Operacion " + this.id + " actualizada";
          this.showModal();
        }
      })
    }
  }

  showModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    })
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.oRouter.navigate(['/admin/Operacion/view', this.id])
    })
    this.myModal.show()
  }

  showForeignModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.ajena), {keyboard: false})
    //var myModalEl = document.getElementById(this.ajena);
    this.myModal.show();   
  }

  openModalFindTeam(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findTeam"), { //pasar el myModal como parametro
      keyboard: false
    })    
    this.myModal.show()
  }

  closeTeamModal(id_team: number) {    
    this.oForm.controls['id_team'].setValue(id_team);
    this.myModal.hide();
  }

}
