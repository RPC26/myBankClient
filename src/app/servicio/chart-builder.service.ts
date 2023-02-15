import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartBuilderService {

  constructor() { }

  buildChart(ctx: string, type: ChartType, data: ChartData, options: ChartConfiguration['options'] | undefined): Chart {
    Chart.register(...registerables);

    return new Chart(ctx , {
      type,
      data,
      options
    });
  }
}