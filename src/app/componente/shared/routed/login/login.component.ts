import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/model/session-interface';
import { IUsuario } from 'src/app/model/usuario-interface';
import { EmitEvent, Events, SessionService } from 'src/app/servicio/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  usuarioName: string = ""

  oFormulario: FormGroup<IUser>

  constructor(
    protected oRouter: Router,
    private oSessionService: SessionService,
    private oFormBuilder: FormBuilder,
  ) {
    this.oFormulario = <FormGroup>this.oFormBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
  }

  login() {
    const user = this.oFormulario.get('login')!.value
    const password = this.oFormulario.get('password')!.value

    this.oSessionService.login(user, password).subscribe(
      {
        next: (data: string) => {
          localStorage.setItem("token", data);
          this.oSessionService.emit(new EmitEvent(Events.login, data));
          this.oRouter.navigate(['/dashboard'])
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.status, error.statusText);
        }
      }
    )
  }

  loginAsAdmin() {
    console.log("loginAsAdmin");
    this.oFormulario.controls.login.setValue("prueba");
    this.oFormulario.controls.password.setValue("prueba");

    const user = this.oFormulario.get('login')!.value
    const password = this.oFormulario.get('password')!.value

    this.oSessionService.login(user, password).subscribe(
      {
        next: (data: string) => {
          localStorage.setItem("token", data);
          this.oSessionService.emit(new EmitEvent(Events.login, data));
          this.oRouter.navigate(['/dashboard'])
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.status, error.statusText);
        }
      }
    )
  }

  loginAsUser() {
    console.log("loginAsAdmin");
    this.oFormulario.controls.login.setValue("jose_salom");
    this.oFormulario.controls.password.setValue("prueba");

    const user = this.oFormulario.get('login')!.value
    const password = this.oFormulario.get('password')!.value

    this.oSessionService.login(user, password).subscribe(
      {
        next: (data: string) => {
          localStorage.setItem("token", data);
          this.oSessionService.emit(new EmitEvent(Events.login, data));
          this.oRouter.navigate(['/usuario/my-datos'])
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.status, error.statusText);
        }
      }
    )
  }

}
