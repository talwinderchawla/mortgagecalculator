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
  @Input() inputChartLabels: number[] = [];
  @Input() inputChartDatasets: ChartDataSet[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.inputChartLabels,
    datasets: this.inputChartDatasets,
  };
  public lineChartLegend = true;

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.lineChartData = {
      labels: this.inputChartLabels,
      datasets: this.inputChartDatasets,
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
