import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { IOperacionesAñoCount } from '../model/dashboard-interface';
import { BASE_URL } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartBuilderService {

  constructor(private oHttp: HttpClient) { }

  buildChart(ctx: string, type: ChartType, data: ChartData, options: ChartConfiguration['options'] | undefined): Chart {
    Chart.register(...registerables);

    return new Chart(ctx , {
      type,
      data,
      options
    });
  }

  getChartData(id_cuenta: number): Observable<IOperacionesAñoCount[]> {
    return this.oHttp.get<IOperacionesAñoCount[]>(`${BASE_URL}/operacion/dashboard/operaciones/${id_cuenta}`)
  }
}