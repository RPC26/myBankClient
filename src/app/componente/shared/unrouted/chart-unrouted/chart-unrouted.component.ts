import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { IOperacionesAñoCount } from 'src/app/model/dashboard-interface';
import { ChartBuilderService } from 'src/app/servicio/chart-builder.service';

@Component({
  selector: 'app-chart-unrouted',
  templateUrl: './chart-unrouted.component.html',
  styleUrls: ['./chart-unrouted.component.css']
})
export class ChartUnroutedComponent implements AfterViewInit {

  @Input() type: ChartType;
  @Input() data: ChartData;
  @Input() options?: ChartConfiguration['options'];
  @Input() cuentaId?: number

  cuentaData: ChartData

  @ViewChild('chart') canvas?: ElementRef;

  @Output() chart = new EventEmitter<Chart>()
  @Output() chartData? = new EventEmitter<IOperacionesAñoCount[]>()

  constructor(private chartBuilderService: ChartBuilderService) {
    this.type = 'line';
    this.data = {labels: [], datasets: []};
  } 

  ngAfterViewInit(): void {
    const ctx = this.canvas?.nativeElement.getContext('2d');
    const chart: Chart = this.chartBuilderService.buildChart(ctx, this.type, this.data, this.options)
    this.chart.emit(chart);
  
    if (this.cuentaId !== undefined) {
      this.getCuentaChart(this.cuentaId)
    }

  }

  getCuentaChart(id: number) {
    this.chartBuilderService.getChartData(id).subscribe({
      next: (data) => {
        this.chartData.emit(data)
      }
    })
  }

}