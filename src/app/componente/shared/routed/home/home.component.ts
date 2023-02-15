
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import { IEstadoCuentas } from 'src/app/model/cuenta-interface';
import { IOperacionesAñoCount } from 'src/app/model/dashboard-interface';
import { CuentaService } from 'src/app/servicio/cuenta.service';
import { OperacionService } from 'src/app/servicio/operacion.service';
import { UsuarioService } from 'src/app/servicio/usuario.service';
import { ChartUnroutedComponent } from '../../unrouted/chart-unrouted/chart-unrouted.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public nombre: string = "rafa";
  public urlimagen: string = "https://fotografias.antena3.com/clipping/cmsimages01/2017/03/17/7EF92031-EE35-44F7-8DC2-D3EF8CE477E2/95.jpg?crop=1265,711,x0,y0&width=1028&height=578&optimize=high&format=webply";
  public claseboton: string = "btn btn-warning";
  public mitamanyo: string = "90px";
  public valor: string = "";

  public operacionesHoy: number = 0;
  public hoy: Date = new Date()

  public usuariosTotal: number = 0

  public cuentasHabilitadas: number = 0
  public cuentasDeshabilitadas: number = 0

  public dataOperaciones: ChartData
  public dataCuentas: ChartData

  graficaOperaciones: Chart
  graficaCuentas: Chart

  public optionsOperaciones: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        font: {size: 25},
        color: "#374151",
        text: 'Operaciones año 2023'
      }

    }
  } 

  public optionsCuentas: ChartConfiguration['options'] = {
    responsive: true,
  } 


  constructor(private oOperacionService: OperacionService, private oUsuarioService: UsuarioService, private oCuentaService: CuentaService
  ) { 
    this.dataCuentas = {
      labels: ["Habilitadas", "Deshabilitadas"], datasets: []
    }
    this.dataOperaciones = {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
              "Octubre", "Noviembre", "Diciembre"],
      datasets: []
    }
  }

  ngOnInit(): void {
    this.getOperacionesHoy()
    this.countUsuarios()
    this.estadoCuentas()
    this.getOperacionesAñoCount()
  }

  ngAfterViewInit(): void {
    
  }

  getOperacionesHoy(): void {
    this.oOperacionService.getOperacionesHoy().subscribe({
      next: (data: number) => {
        this.operacionesHoy = data;
      }
    })
  }

  getOperacionesAñoCount(): void {
    this.oOperacionService.getOperacionesCountGrafica().subscribe({
      next: (data: IOperacionesAñoCount[]) => {

        data.forEach(dataset => {
          this.graficaOperaciones.data.datasets.push(dataset)
        })
        
        this.graficaOperaciones.update()
      }
    })
  }

  setGraficaOperaciones(chart: Chart) {
    this.graficaOperaciones = chart
  }

  setGraficaCuentas(chart: Chart) {
    this.graficaCuentas = chart
  }

  countUsuarios(): void {
    this.oUsuarioService.count().subscribe({
      next: (data: number) => {
        this.usuariosTotal = data
      } 
    })
  }

  estadoCuentas(): void {
    this.oCuentaService.getEstadoCuentas().subscribe({
      next: (data: IEstadoCuentas) => {
        this.cuentasDeshabilitadas = data.deshabilitadas
        this.cuentasHabilitadas = data.habilitadas

        this.graficaCuentas.data.datasets.push({
          label: "Cuentas",
          data: [this.cuentasHabilitadas, this.cuentasDeshabilitadas]
        })

        this.graficaCuentas.update()
      }
    })
  }


  openModal(e: any): void {
    console.log(e);
    alert("hola mundo");
  }

  openModal2(e: any): void {
    console.log(e);
    console.log(e.data);

  }




}
