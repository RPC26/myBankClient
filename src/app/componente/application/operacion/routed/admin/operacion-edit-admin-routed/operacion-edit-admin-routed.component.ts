import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOperacion, IOperacion2Form, IOperacionUpdate } from 'src/app/model/operacion-interface';
import { CryptoService } from 'src/app/servicio/crypto.service';
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

  emisor: string = "emisorModal";
  tipoEmi: number = 1
  receptor: string = "receptorModal"
  tipoRec: number = 2
  tipooperacion: string = "tipooperacionModal"

  constructor(
    private oRouter: Router,
    private oOperacionService: OperacionService,
    private oFormBuilder: FormBuilder,
    private oActivatedRoute: ActivatedRoute,
    private oCryptoService: CryptoService,
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [''],
      fechahoraoperacion: ['', Validators.required],
      cantidad: ['', Validators.required],
      tipooperacion: ['', Validators.required],
      emisorCuentaEntity: ['', Validators.required],
      receptorCuentaEntity: ['']
    });
  }

  ngOnInit() {
    
    this.getOne();
    
  }

  getOne() {
    this.oOperacionService.getOne(this.id).subscribe({
      next: (data: IOperacion) => {
        this.oIOperacion = data;
        console.log(data);
        this.oForm = <FormGroup>this.oFormBuilder.group({
          id: [data.id],
          cantidad: [data.cantidad, Validators.required],
          fechahoraoperacion: [data.fechahoraoperacion, Validators.required],
          tipooperacion: [data.tipooperacion.id, [Validators.required]],
          emisorCuentaEntity: [data.emisorCuentaEntity.id, Validators.required],
          receptorCuentaEntity: [null]
        });

        if (data.receptorCuentaEntity) {
          this.oForm = <FormGroup>this.oFormBuilder.group({
            id: [data.id],
            cantidad: [data.cantidad, Validators.required],
            fechahoraoperacion: [data.fechahoraoperacion, Validators.required],
            tipooperacion: [data.tipooperacion.id, [Validators.required]],
            emisorCuentaEntity: [data.emisorCuentaEntity.id, Validators.required],
            receptorCuentaEntity: [data.receptorCuentaEntity.id]
          });
        }
      }
    })
  }
  
  
  onSubmit() {
    console.log("onSubmit");
    this.oOperacionUpdate = {
      id: this.oForm.value.id,
      fechahoraoperacion: this.oForm.value.fechahoraoperacion,
      cantidad: this.oForm.value.cantidad,
      tipooperacion: { id: this.oForm.value.id},
      emisorCuentaEntity: { id: this.oForm.value.id},
    }

    if (this.oForm.value.receptorCuentaEntity) {
      this.oOperacionUpdate = {
        ...this.oOperacionUpdate,
        receptorCuentaEntity: { id: this.oForm.value.id}
      }
    }
    if (this.oForm.valid) {
      this.oOperacionService.updateOne(this.oOperacionUpdate).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "MYBANK";
          this.modalContent = "Operación " + data + " actualizada";
          this.showModal(data);
        }
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

  showTipocuentaModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.tipooperacion), {keyboard: false})
    //var myModalEl = document.getElementById(this.ajena);
    this.myModal.show();   
  }
}
