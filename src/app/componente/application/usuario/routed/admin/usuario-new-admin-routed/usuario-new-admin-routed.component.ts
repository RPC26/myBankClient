import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario, IUsuario2Form, IUsuarioCreate } from 'src/app/model/usuario-interface';
import { CryptoService } from 'src/app/servicio/crypto.service';
import { UsuarioService } from 'src/app/servicio/usuario.service';
declare let bootstrap: any;

@Component({
  selector: 'app-usuario-new-admin-routed',
  templateUrl: './usuario-new-admin-routed.component.html',
  styleUrls: ['./usuario-new-admin-routed.component.css']
})
export class UsuarioNewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oIUsuarior: IUsuario = null;
  oUsuario2Form: IUsuario2Form = null;
  oUsuarioCreate: IUsuarioCreate = null;
  oForm: FormGroup<IUsuario2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  ajena: string = "ajena";

  tipousuarioNombre: string = ""

  constructor(
    private oRouter: Router,
    private oUsuarioService: UsuarioService,
    private oFormBuilder: FormBuilder,
    private oCryptoService: CryptoService,
  ) {
  }

  ngOnInit() {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [''],
      dni: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      apellido1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      apellido2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      login: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      id_tipousuario: ['', Validators.required]
    });
  }
  
  onSubmit() {
    console.log("onSubmit");
    this.oUsuarioCreate = {
      id: this.oForm.value.id,
      dni: this.oForm.value.dni,
      nombre: this.oForm.value.nombre,
      apellido1: this.oForm.value.apellido1,
      apellido2: this.oForm.value.apellido2,
      login: this.oForm.value.login,
      password: this.oCryptoService.getSHA256(this.oForm.value.password),
      email: this.oForm.value.email,
      tipousuario: { id: this.oForm.value.id_tipousuario}
    }
    if (this.oForm.valid) {
      this.oUsuarioService.newOne(this.oUsuarioCreate).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "MYBANK";
          this.modalContent = "Usuario " + data + " creado";
          this.showModal(data);
        }
      })
    }

  }

  setTipousario(id: number) {
    this.oForm.controls['id_tipousuario'].setValue(id);
    this.myModal.hide();
  }

  setTipousuarioNombre(nombre: string) {
    this.tipousuarioNombre = nombre
  }

  showModal = (data) => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), {keyboard: false})
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (): void => {
      this.oRouter.navigate(['/admin/usuario/view', data])
    })
    this.myModal.show()
  }
  
  showForeignModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.ajena), {keyboard: false})
    this.myModal.show();   
  }
}
