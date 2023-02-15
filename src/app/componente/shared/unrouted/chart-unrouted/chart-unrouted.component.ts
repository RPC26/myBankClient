import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
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

  @ViewChild('chart') canvas?: ElementRef;

  @Output() chart = new EventEmitter<Chart>()

  constructor(private chartBuilderService: ChartBuilderService) {
    this.type = 'line';
    this.data = {labels: [], datasets: []};
  } 

  ngAfterViewInit(): void {
    const ctx = this.canvas?.nativeElement.getContext('2d');
    const chart: Chart = this.chartBuilderService.buildChart(ctx, this.type, this.data, this.options)
    this.chart.emit(chart);
  }

}