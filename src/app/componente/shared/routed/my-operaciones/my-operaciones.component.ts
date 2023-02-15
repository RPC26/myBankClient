import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOperacionCreate } from 'src/app/model/operacion-interface';
import { IFormOperacionUser } from 'src/app/model/operacion-usuario-interface';
import { CuentaService } from 'src/app/servicio/cuenta.service';
import { OperacionService } from 'src/app/servicio/operacion.service';
import { SessionService } from 'src/app/servicio/session.service';
declare let bootstrap: any;

@Component({
  selector: 'app-my-operaciones',
  templateUrl: './my-operaciones.component.html',
  styleUrls: ['./my-operaciones.component.css']
})
export class MyOperacionesComponent implements OnInit {

  myModal: any;
  myToast: any
  oForm: FormGroup<IFormOperacionUser>
  oOperacionCreate: IOperacionCreate = null;
  tipooperacion: number = 1
  tipooperacionString: string = "Ingresar"
  tipooperacionModal: string = "ingresado"
  idUsuarioSesion: number
  cantidad: number = 0

  saldo25: number = 0
  saldo50: number = 0
  saldoCuenta: number = 0

  ibanEmisor: string = ""
  ibanReceptor: string = ""

  constructor(
    private oSessionService: SessionService,
    private oCuentaService: CuentaService,
    private oFormBuilder: FormBuilder,
    private oOperacionService: OperacionService
  ) {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      cantidad: ['', [Validators.required, Validators.min(1)]],
      emisorCuentaEntity: ['', Validators.required],
      receptorCuentaEntity: ['',]
    });
    this.idUsuarioSesion = parseInt(oSessionService.getUserId())
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("onSubmit");
    this.oOperacionCreate = {
      id: 0,
      cantidad: this.oForm.value.cantidad,
      tipooperacion: { id: this.tipooperacion },
      emisorCuentaEntity: { id: this.oForm.value.emisorCuentaEntity }
    }

    if (this.oForm.value.receptorCuentaEntity) {
      this.oOperacionCreate = {
        ...this.oOperacionCreate,
        receptorCuentaEntity: { id: this.oForm.value.receptorCuentaEntity }
      }
    }
    if (this.oForm.valid) {
      this.oOperacionService.newOne(this.oOperacionCreate).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.cantidad = this.oForm.value.cantidad
          this.oForm.reset()
          this.ibanEmisor = ''
          this.ibanReceptor = ''
          this.showModal()
        },
        error: (err) => {
          this.showToast()
        }
      })
    }
  }

  showModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById("feedback"), { keyboard: false })
    var myModalEl = document.getElementById("feedback");

    this.myModal.show()
  }

  showToast = () => {
    this.myToast = new bootstrap.Toast(document.getElementById("errorToast"), { keyboard: false })
    this.myToast.show()
  }

  modalCantidad() {
    this.myModal = new bootstrap.Modal(document.getElementById("cantidad"), { keyboard: false })
    var myModalEl = document.getElementById("cantidad");

    this.myModal.show()
  }

  modalCuentaEmisor() {
    this.myModal = new bootstrap.Modal(document.getElementById("emisor"), { keyboard: false })
    var myModalEl = document.getElementById("emisor");

    this.myModal.show()
  }

  modalCuentaReceptor() {
    this.myModal = new bootstrap.Modal(document.getElementById("receptor"), { keyboard: false })
    var myModalEl = document.getElementById("receptor");

    this.myModal.show()
  }

  setTipooperacion(id: number) {
    this.tipooperacion = id

    if (this.tipooperacion === 1) {
      this.tipooperacionString = "Ingresar"
      this.tipooperacionModal = "ingresado"
      this.oForm.reset()
      this.ibanEmisor = ''
      this.ibanReceptor = ''
    }
    if (this.tipooperacion === 2) {
      this.tipooperacionString = "Extraer"
      this.tipooperacionModal = "extraído"
      this.oForm.reset()
      this.ibanEmisor = ''
      this.ibanReceptor = ''
    }
    if (this.tipooperacion === 3) {
      this.tipooperacionString = "Transferencia"
      this.tipooperacionModal = "transferido"
      this.oForm.reset()
      this.ibanEmisor = ''
      this.ibanReceptor = ''
    }
  }

  setIbanEmisor(iban: string) {
    this.ibanEmisor = iban;
  }

  setIbanReceptor(iban: string) {
    this.ibanReceptor = iban;
  }

  setCantidad(cantidad: number) {
    this.oForm.controls.cantidad.setValue(cantidad);
    this.myModal.hide()
  }

  setCuentaEmisor(id: number) {
    this.oForm.controls['emisorCuentaEntity'].setValue(id);
    console.log(id)
    this.oCuentaService.getSaldo(id).subscribe({
      next: (data) => {
        this.saldoCuenta = data.saldoReal
        this.saldo25 = data.saldoReal * 0.25
        this.saldo50 = data.saldoReal * 0.5
      }
    })
    this.myModal.hide();
  }

  setCuentaReceptor(id: number) {
    this.oForm.controls['receptorCuentaEntity'].setValue(id);
    this.myModal.hide();
  }
}
