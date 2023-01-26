import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOperacion, IOperacion2Form, IOperacionCreate } from 'src/app/model/operacion-interface';
import { CryptoService } from 'src/app/servicio/crypto.service';
import { OperacionService } from 'src/app/servicio/operacion.service';
declare let bootstrap: any;

@Component({
  selector: 'app-operacion-new-admin-routed',
  templateUrl: './operacion-new-admin-routed.component.html',
  styleUrls: ['./operacion-new-admin-routed.component.css']
})
export class OperacionNewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oIOperacion: IOperacion = null;
  oOperacion2Form: IOperacion2Form = null;
  oOperacionCreate: IOperacionCreate = null;
  oForm: FormGroup<IOperacion2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  cuenta: string = "cuentaModal";
  tipooperacion: string = "tipooperacionModal"

  constructor(
    private oRouter: Router,
    private oOperacionService: OperacionService,
    private oFormBuilder: FormBuilder,
    private oCryptoService: CryptoService,
  ) {
  }

  ngOnInit() {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [''],
      fechahoraoperacion: ['', Validators.required],
      cantidad: ['', Validators.required],
      id_tipooperacion: ['', Validators.required],
      cuentaEmisor: ['', Validators.required],
      cuentaReceptor: ['', Validators.required]
    });
  }
  
  onSubmit() {
    console.log("onSubmit");
    this.oOperacionCreate = {
      id: this.oForm.value.id,
      fechahoraoperacion: this.oForm.value.fechahoraoperacion,
      cantidad: this.oForm.value.cantidad,
      tipoOperacion: { id: this.oForm.value.id},
      cuentaEmisor: { id: this.oForm.value.id},
      cuentaReceptor: { id: this.oForm.value.id}

    }
    if (this.oForm.valid) {
      this.oOperacionService.newOne(this.oOperacionCreate).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "MYBANK";
          this.modalContent = "Usuario " + data + " creado";
          this.showModal(data);
        }
      })
    }

  }

  setCuentaEmisor(id: number) {
    this.oForm.controls['cuentaEmisor'].setValue(id);
    this.myModal.hide();
  }

  setCuentaReceptor(id: number) {
    this.oForm.controls['cuentaReceptor'].setValue(id);
    this.myModal.hide();
  }
  setTipoOperacion(id: number) {
    this.oForm.controls['tipoOperacion'].setValue(id);
    this.myModal.hide();
  }

  showModal = (data) => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), {keyboard: false})
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (): void => {
      this.oRouter.navigate(['/admin/Operacion/view', data])
    })
    this.myModal.show()
  }
  
  showUsuarioModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.cuenta), {keyboard: false})
    //var myModalEl = document.getElementById(this.ajena);
    this.myModal.show();   
  }

  showTipocuentaModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.tipooperacion), {keyboard: false})
    //var myModalEl = document.getElementById(this.ajena);
    this.myModal.show();   
  }
}
