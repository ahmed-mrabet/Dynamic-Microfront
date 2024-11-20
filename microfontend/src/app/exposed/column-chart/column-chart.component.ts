import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Chart, registerables } from 'chart.js';
import Config from '../../../../config.json'
Chart.register(...registerables);
@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent  implements AfterViewInit {
  @ViewChild('barChart') private chartRef!: ElementRef;

  CONNECTORNAME = Config.ConnectorName;
  selectedTable: string = '';
  selectedAxisX: string = '';
  selectedAxisY: string = '';
  labelX: string = '';
  labelY: string = '';
  columnXValues: string[] = [];
  columnYValues: number[] = [];
  chartName: string = '';
  barChart: any;

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    // Subscribe to query params to retrieve the passed parameters
    this.route.queryParams.subscribe(params => {
      this.selectedTable = params['tableName'];
      this.selectedAxisX = params['axisX'];
      this.selectedAxisY = params['axisY'];
      this.labelX = params['labelX'];
      this.labelY = params['labelY'];
      this.columnXValues = JSON.parse(params['columnXValues']);
      this.columnYValues = JSON.parse(params['columnYValues']);
      this.chartName = params['chartName'];

      // Initialize the chart with the passed data
      this.initializeColumnChart(this.columnXValues, this.columnYValues);
    });
  }

  private initializeColumnChart(labels: string[], data: number[]): void {
    if (!this.chartRef || !this.chartRef.nativeElement) {
      return;
    }

    if (this.barChart) {
      this.barChart.destroy(); // Destroy existing chart to avoid memory leaks
    }

    this.barChart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: this.labelY,
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
          }
        ]
      },
      options: {
        indexAxis: 'y', 
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          },
          y: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          }
        }
      }
    });
  }

}
