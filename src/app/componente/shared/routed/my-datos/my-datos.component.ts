import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { OperacionPlistUnroutedComponent } from 'src/app/componente/application/operacion/unrouted/operacion-plist-unrouted/operacion-plist-unrouted.component';
import { ICuentaPage } from 'src/app/model/cuenta-interface';
import { CuentaService } from 'src/app/servicio/cuenta.service';
import { SessionService } from 'src/app/servicio/session.service';

declare let bootstrap: any

@Component({
  selector: 'app-my-datos',
  templateUrl: './my-datos.component.html',
  styleUrls: ['./my-datos.component.css']
})
export class MyDatosComponent implements OnInit {

  page: number = 0
  size: number = 10
  filter: string = ""
  idUsuarioSesion = 0
  strSort: string = ""
  strSortDirection: string = ""

  cuentasUsuario: ICuentaPage
  myModal: any

  ibanCuenta: string = ''
  saldoRealCuenta: number = 0
  saldoBeneficioCuenta: number = 0
  fechaCreacionCuenta: Date = new Date()
  tipoCuenta: string = ''
  estadoCuenta: boolean = false

  cuentaIdSelected: number = 0

  @ViewChild(OperacionPlistUnroutedComponent) operacionPlist: OperacionPlistUnroutedComponent

  public dataCuentas: ChartData
  public optionsCuentas: ChartConfiguration['options'] = {
    responsive: true,
  } 

  dataOperaciones: ChartData = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [
      {
        label: 'Ingresos',
        data: [10, 20, 30, 40],      
        backgroundColor: '#65a30d',
        borderColor: '#65a30d'
      },
      {
        label: 'Extracciones',
        data: [50, 60, 20, 80],
        tension: 0.5,
        backgroundColor: '#9BD0F5',
        borderColor: '#9BD0F5',
      },
      {
        label: 'Transferencias',
        data: [15, 70, 50, 40],
        tension: 0.5,
        backgroundColor: '#9333ea',
        borderColor: '#9333ea',
      },
      
    ]
}

  constructor(
    private oCuentaService: CuentaService,
    private oSessionService: SessionService
  ) {
    this.dataCuentas = {
      labels: ["Positivo", "Negativo"], 
      datasets: [
        {
          label: 'Dinero', 
          data: [21, 342],
        },
      ]
    }
  }

  ngOnInit(): void {
    this.idUsuarioSesion = parseInt(this.oSessionService.getUserId())
    this.getCuentas()
  }

  getCuentas() {
    this.oCuentaService.getPage(this.page, this.size, this.filter, 0,
      this.idUsuarioSesion, this.strSort, this.strSortDirection).subscribe({
        next: (data) => {
          this.cuentasUsuario = data
        }
      })
  }

  getGraficaOperaciones () {

  }

  modalCuenta(id: number) {
    this.myModal = new bootstrap.Modal(document.getElementById("cuentaModal"), { keyboard: false })
    
    this.cuentaIdSelected = id
    this.oCuentaService.getOne(this.cuentaIdSelected).subscribe({
      next: (data) => {
        this.estadoCuenta = data.activa
        this.ibanCuenta = data.iban
        this.tipoCuenta = data.tipocuenta.nombre
        this.fechaCreacionCuenta = data.fechacreacion
        
        this.oCuentaService.getSaldo(this.cuentaIdSelected).subscribe({
          next: (saldo) => {
            this.saldoBeneficioCuenta = saldo.saldoBeneficio
            this.saldoRealCuenta = saldo.saldoReal

            this.operacionPlist.getPage()
          }
        })
      } 
    })

    this.myModal.show()
  }

}
