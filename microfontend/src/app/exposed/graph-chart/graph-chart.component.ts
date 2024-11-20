import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Chart, registerables } from 'chart.js';
import Config from '../../../../config.json'
Chart.register(...registerables);

@Component({
  selector: 'app-graph-chart',
  templateUrl: './graph-chart.component.html',
  styleUrls: ['./graph-chart.component.scss']
})
export class GraphChartComponent implements AfterViewInit {
  @ViewChild('lineChart') private chartRef!: ElementRef;

  CONNECTORNAME = Config.ConnectorName;
  selectedTable: string = '';
  selectedAxisX: string = '';
  selectedAxisY: string = '';
  labelX: string = '';
  labelY: string = '';
  columnXValues: string[] = [];
  columnYValues: number[] = [];
  chartName: string = '';
  lineChart: any;

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
      this.initializeLineChart(this.columnXValues, this.columnYValues);
    });
  }


  private initializeLineChart(labels: string[], data: number[]): void {

    if (!this.chartRef || !this.chartRef.nativeElement) {
      return;
    }

    if (this.lineChart) {
      this.lineChart.destroy(); // Destroy existing chart to avoid memory leaks
    }

    this.lineChart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: this.labelY,
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: { beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          }}
        }
      }
    });
  }

}
