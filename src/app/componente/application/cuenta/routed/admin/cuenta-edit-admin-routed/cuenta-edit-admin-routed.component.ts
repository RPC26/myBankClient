import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICuenta, ICuenta2Form, ICuentaCreate, ICuentaUpdate } from 'src/app/model/cuenta-interface';
import { CuentaService } from 'src/app/servicio/cuenta.service';
declare let bootstrap: any;
@Component({
  selector: 'app-cuenta-edit-admin-routed',
  templateUrl: './cuenta-edit-admin-routed.component.html',
  styleUrls: ['./cuenta-edit-admin-routed.component.css']
})
export class CuentaEditAdminRoutedComponent implements OnInit {

  id: number = 0;
  oICuenta: ICuenta = null;
  oCuenta2Form: ICuenta2Form = null;
  oCuentaUpdate: ICuentaUpdate = null;
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
    private oFormBuilder: FormBuilder
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [''],
      id_tipocuenta: ['', [Validators.required]],
      id_usuario: ['', Validators.required],
      iban: ['', Validators.pattern("^[E][S][1][2][\\s]\\d{4}[\\s]\\d{4}[\\s]\\d{2}[\\s]\\d{8}$")],
      activa: [false, Validators.required]
    });
  }

  ngOnInit() {
    this.getOne();
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

  setUsuarionombre(nombre: string) {
    this.usuarioNombre = nombre;
  }

  getOne() {
    this.oCuentaService.getOne(this.id).subscribe({
      next: (data: ICuenta) => {
        this.oICuenta = data;
        console.log("recogio")
        console.log(data);
        this.oForm = <FormGroup>this.oFormBuilder.group({
          id: [data.id],
          id_tipocuenta: [data.tipocuenta.id, [Validators.required]],
          id_usuario: [data.usuario.id, Validators.required],
          iban: [data.iban, Validators.pattern("^[E][S][1][2][\\s]\\d{4}[\\s]\\d{4}[\\s]\\d{2}[\\s]\\d{8}$")],
          activa: [data.activa, Validators.required]
        });
      }
    })
  }

  onSubmit() {
    console.log("onSubmit");
    this.oCuentaUpdate = {
      id: this.oForm.value.id,
      iban:  this.oForm.value.iban,
      tipocuenta: { id: this.oForm.value.id_tipocuenta},
      usuario: { id: this.oForm.value.id_usuario},
      activa: this.oForm.value.activa
    }
    if (this.oForm.valid) {
      this.oCuentaService.updateOne(this.oCuentaUpdate).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "MYBANK";
          this.modalContent = "Cuenta " + this.id + " actualizada";
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
      this.oRouter.navigate(['/admin/cuenta/view', this.id])
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
