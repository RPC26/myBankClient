import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICuenta, ICuenta2Form, ICuentaCreate } from 'src/app/model/cuenta-interface';
import { CryptoService } from 'src/app/servicio/crypto.service';
import { CuentaService } from 'src/app/servicio/cuenta.service';
declare let bootstrap: any;

@Component({
  selector: 'app-cuenta-new-admin-routed',
  templateUrl: './cuenta-new-admin-routed.component.html',
  styleUrls: ['./cuenta-new-admin-routed.component.css']
})
export class CuentaNewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oICuenta: ICuenta = null;
  oCuenta2Form: ICuenta2Form = null;
  oCuentaCreate: ICuentaCreate = null;
  oForm: FormGroup<ICuenta2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  usuario: string = "usuarioModal";
  tipocuenta: string = "tipocuentaModal"

  tipocuentaNombre: string = ""
  usuarioNombre: string = ""


  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oCuentaService: CuentaService,
    private oFormBuilder: FormBuilder,
    private oCryptoService: CryptoService,
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [''],
      id_tipocuenta: ['', [Validators.required, Validators.pattern("^[{1,2}]$")]],
      id_usuario: ['', Validators.required],
      iban: ['', Validators.pattern("^[E][S][1][2][\\s]\\d{4}[\\s]\\d{4}[\\s]\\d{2}[\\s]\\d{8}$")],
      activa: [false, Validators.required]
    });
  }

  ngOnInit() {
  }
  
  onSubmit() {
    console.log("onSubmit");
    this.oCuentaCreate = {
      id: this.oForm.value.id,
      iban:  this.oForm.value.iban,
      fechacreacion: this.oForm.value.fechacreacion,
      tipocuenta: { id: this.oForm.value.id_tipocuenta},
      usuario: { id: this.oForm.value.id_usuario},
      activa: this.oForm.value.activa
    }
    if (this.oForm.valid) {
      this.oCuentaService.newOne(this.oCuentaCreate).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "MYBANK";
          this.modalContent = "Cuenta " + data + " creada";
          this.showModal(data);
        }
      })
    }

  }

  setUsario(id: number) {
    this.oForm.controls['id_usuario'].setValue(id);
    this.myModal.hide();
  }

  setTipocuenta(id: number) {
    this.oForm.controls['id_tipocuenta'].setValue(id);
    this.myModal.hide();
  }

  setTipocuentaNombre(nombre: string) {
    this.tipocuentaNombre = nombre;
  }

  setUsuarionombre(nombre: string)  {
    this.usuarioNombre = nombre;
  }

  showModal = (data) => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), {keyboard: false})
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (): void => {
      this.oRouter.navigate(['/admin/cuenta/view', data])
    })
    this.myModal.show()
  }

  showUsuarioModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.usuario), {keyboard: false})
    //var myModalEl = document.getElementById(this.ajena);
    this.myModal.show();   
  }

  showTipocuentaModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.tipocuenta), {keyboard: false})
    //var myModalEl = document.getElementById(this.ajena);
    this.myModal.show();   
  }

}
