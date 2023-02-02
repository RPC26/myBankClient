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

  emisor: string = "emisorModal";
  tipoEmi: number = 1
  receptor: string = "receptorModal";
  tipoRec: number = 2
  tipooperacion: string = "tipooperacionModal"

  constructor(
    private oRouter: Router,
    private oOperacionService: OperacionService,
    private oFormBuilder: FormBuilder,
    private oCryptoService: CryptoService,
  ) {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [''],
      fechahoraoperacion: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      tipooperacion: ['', [Validators.pattern("^[{1,2,3}]$"), Validators.required]],
      emisorCuentaEntity: ['', Validators.required],
      receptorCuentaEntity: ['', ]
    });
  }

  ngOnInit() {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [''],
      fechahoraoperacion: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      tipooperacion: ['', [Validators.pattern("^[{1,2,3}]$"), Validators.required]],
      emisorCuentaEntity: ['', Validators.required],
      receptorCuentaEntity: ['', ]
    });
  }
  
  onSubmit() {
    console.log("onSubmit");
    this.oOperacionCreate = {
      id: this.oForm.value.id,
      fechahoraoperacion: this.oForm.value.fechahoraoperacion,
      cantidad: this.oForm.value.cantidad,
      tipooperacion: { id: this.oForm.value.tipooperacion},
      emisorCuentaEntity: { id: this.oForm.value.emisorCuentaEntity}
    }

    if (this.oForm.value.receptorCuentaEntity) {
      this.oOperacionCreate = {
        ...this.oOperacionCreate,
        receptorCuentaEntity: {id: this.oForm.value.receptorCuentaEntity}
      }
    }
    if (this.oForm.valid) {
      this.oOperacionService.newOne(this.oOperacionCreate).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "MYBANK";
          this.modalContent = "Operacion " + data + " creada";
          this.showModal(data);
        }, 
      })
    }

  }

  setCuentaEmisor(id: number) {
    this.oForm.controls['emisorCuentaEntity'].setValue(id);
    this.myModal.hide();
  }

  setCuentaReceptor(id: number) {
    this.oForm.controls['receptorCuentaEntity'].setValue(id);
    this.myModal.hide();
  }
  setTipoOperacion(id: number) {
    this.oForm.controls['tipooperacion'].setValue(id);
    this.myModal.hide();
  }

  showModal = (data) => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), {keyboard: false})
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (): void => {
      this.oRouter.navigate(['/admin/operacion/view', data])
    })
    this.myModal.show()
  }
  
  showEmisorModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.emisor), {keyboard: false})
    //var myModalEl = document.getElementById(this.ajena);
    this.myModal.show();   
  }

  showReceptorModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.receptor), {keyboard: false})
    //var myModalEl = document.getElementById(this.ajena);
    this.myModal.show();   
  }

  showTipooperacionModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.tipooperacion), {keyboard: false})
    //var myModalEl = document.getElementById(this.ajena);
    this.myModal.show();   
  }
}
