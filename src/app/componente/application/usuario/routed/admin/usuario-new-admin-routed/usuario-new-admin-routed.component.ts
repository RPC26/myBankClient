import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario, IUsuario2Form, IUsuario2Send } from 'src/app/model/usuario-interface';
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
  oUsuario2Send: IUsuario2Send = null;
  oForm: FormGroup<IUsuario2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  ajena: string = "ajena";


  constructor(
    private oRouter: Router,
    private oUsuarioService: UsuarioService,
    private oFormBuilder: FormBuilder
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
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      id_tipousuario: ['', Validators.required]
    });
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
      this.oUsuarioService.newOne(this.oUsuario2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "MYBANK";
          this.modalContent = "Usuario " + data + " creado";
          this.showModal(data);
        }
      })
    }

  }

  

  showModal = (data) => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    })
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.oRouter.navigate(['/admin/user/view', data])
    })
    this.myModal.show()
  }

}
