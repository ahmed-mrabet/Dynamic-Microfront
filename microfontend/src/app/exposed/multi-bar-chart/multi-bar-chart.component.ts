import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import Config from '../../../../config.json'


@Component({
  selector: 'app-multi-bar-chart',
  templateUrl: './multi-bar-chart.component.html',
  styleUrls: ['./multi-bar-chart.component.scss']
})
export class MultiBarChartComponent implements OnInit {
  CONNECTORNAME = Config.ConnectorName;
  chart: any = null;
  columnXValues: string[][] = [];
  columnYValues: number[][] = [];
  chartName: string = '';
  tableName: string = '';
  xAxisLabel: string = '';
  yAxisLabel: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tableName = params['tableName'];
      this.columnXValues = JSON.parse(params['columnXValues']);
      this.columnYValues = JSON.parse(params['columnYValues']);
      this.chartName = params['chartName'];
      this.xAxisLabel = params['xAxisLabel']; 
      this.yAxisLabel = params['yAxisLabel'];
      this.createChart();
    });
  }

  createChart(): void {
    const tableNames = this.tableName.split(',');
    const combinedXValues = Array.from(new Set(this.columnXValues.flat()));

    // Create datasets for each table
    const datasets = this.columnXValues.map((xValues, index) => {
      const yValues = combinedXValues.map(value => {
        const valueIndex = xValues.indexOf(value);
        return valueIndex !== -1 ? this.columnYValues[index][valueIndex] : 0;
      });

      return {
        label: tableNames[index],
        backgroundColor: `rgba(${index * 70}, ${99 + index * 50}, ${132 + index * 50}, 0.5)`,
        data: yValues
      };
    });

    const ctx = document.getElementById('multiBarChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: combinedXValues,
          datasets: datasets
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: this.chartName
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: this.xAxisLabel
              }
            },
            y: {
              title: {
                display: true,
                text: this.yAxisLabel
              }
            }
          }
        }
      });
    }
  }

}
