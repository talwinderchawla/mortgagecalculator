import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input() chartType: string = 'line';
  @Input() inputLineChartLabels: number[] = [];
  @Input() inputLineChartDatasets: ChartDataSet[] = [];
  @Input() inputBarChartLabels: string[] = [];
  @Input() inputBarChartDatasets: { data: number[]; label: string }[] = [];

  public typeOfChart = this.chartType;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.inputLineChartLabels,
    datasets: this.inputLineChartDatasets,
  };
  public lineChartLegend = true;

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };

  public barChartOptions: ChartOptions = {
    responsive: false,
    scales: {
      x: {
        stacked: true,
      },
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.inputBarChartLabels,
    datasets: this.inputBarChartDatasets,
  };

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.lineChartData = {
      labels: this.inputLineChartLabels,
      datasets: this.inputLineChartDatasets,
    };

    this.barChartData = {
      labels: this.inputBarChartLabels,
      datasets: this.inputBarChartDatasets,
    };
  }
}

export interface ChartDataSet {
  data: number[];
  label: string;
  fill: boolean;
  tension: number;
  borderColor: string;
  backgroundColor: string;
}
