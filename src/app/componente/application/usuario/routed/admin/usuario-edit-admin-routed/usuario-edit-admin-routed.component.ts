import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario, IUsuario2Form, IUsuarioUpdate } from 'src/app/model/usuario-interface';
import { UsuarioService } from 'src/app/servicio/usuario.service';
declare let bootstrap: any;
@Component({
  selector: 'app-usuario-edit-admin-routed',
  templateUrl: './usuario-edit-admin-routed.component.html',
  styleUrls: ['./usuario-edit-admin-routed.component.css']
})
export class UsuarioEditAdminRoutedComponent implements OnInit {

  id: number = 0;
  oIUsuario: IUsuario = null;
  oUsuario2Form: IUsuario2Form = null;
  oUsuario2Send: IUsuarioUpdate = null;
  oForm: FormGroup<IUsuario2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  ajena: string = "ajenaModal";

  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService,
    private oFormBuilder: FormBuilder
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getOne();
  }

  setTipousario(id: number) {
    this.oForm.controls['id_tipousuario'].setValue(id);
    this.myModal.hide();
  }

  getOne() {
    this.oUsuarioService.getOne(this.id).subscribe({
      next: (data: IUsuario) => {
        this.oIUsuario = data;
        console.log(data);
        this.oForm = <FormGroup>this.oFormBuilder.group({
          id: [data.id],
          dni: [data.dni, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
          nombre: [data.nombre, [Validators.required]],
          apellido1: [data.apellido1, [Validators.required, ]],
          apellido2: [data.apellido2, [Validators.required,]],
          login: [data.login, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
          email: [data.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          id_tipousuario: [data.tipousuario.id, Validators.required]
        });
      }
    })
  }

  onSubmit() {
    console.log("onSubmit");
    this.oUsuario2Send = {
      id: this.oForm.value.id,
      dni: this.oForm.value.dni,
      nombre: this.oForm.value.nombre,
      apellido1: this.oForm.value.apellido1,
      apellido2: this.oForm.value.apellido2,
      login: this.oForm.value.login,
      email: this.oForm.value.email,
      tipousuario: { id: this.oForm.value.id_tipousuario}
    }
    if (this.oForm.valid) {
      this.oUsuarioService.updateOne(this.oUsuario2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "MYBANK";
          this.modalContent = "Usuario " + this.id + " actualizado";
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
      this.oRouter.navigate(['/admin/usuario/view', this.id])
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
