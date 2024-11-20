import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import Config from '../../../../config.json'

@Component({
  selector: 'app-pie-chart-doughnut',
  templateUrl: './pie-chart-doughnut.component.html',
  styleUrls: ['./pie-chart-doughnut.component.scss']
})
export class PieChartDoughnutComponent {
  CONNECTORNAME = Config.ConnectorName;

  tableName: string = '';
  labels: string[] = [];
  data: number[] = [];
  chartName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tableName = params['tableName'];
      this.labels = JSON.parse(params['columnLabelsValues']);
      this.data = JSON.parse(params['columnDataValues']);
      this.chartName = params['chartName'];
      this.createChart();
    });
  }

  createChart(): void {
    const canvas = document.getElementById('myPieChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
  
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut', 
        data: {
          labels: this.labels,
          datasets: [{
            data: this.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(75, 192, 192, 0.4)',
              'rgba(153, 102, 255, 0.4)',
              'rgba(255, 159, 64, 0.4)',
              'rgba(255, 0, 0, 0.4)',
              'rgba(0, 0, 255, 0.4)',
              'rgba(0, 255, 255, 0.4)',
              'rgba(128, 0, 128, 0.4)',
              'rgba(255, 128, 0, 0.4)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 0, 0, 1)',
              'rgba(0, 0, 255, 1)',
              'rgba(0, 255, 255, 1)',
              'rgba(128, 0, 128, 1)',
              'rgba(255, 128, 0, 1)'
            ],
            
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, 
          plugins: {
            legend: {
              position: 'left',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += context.raw;
                  return label;
                },
                afterLabel: function(context) {
                  const dataset = context.dataset;
                  const index = context.dataIndex;
                  const value = dataset.data[index];
                  const sum = dataset.data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                  const percentage = Math.round((value / sum) * 100);
                  return '(' + percentage + '%)';
                }
              }
            },
            datalabels: {
              formatter: (value: number, ctx: any) => {
                const sum = ctx.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
                const percentage = (value * 100 / sum).toFixed(2) + "%";
                return percentage;
              },
              color: '#fff',
              anchor: 'end',
              align: 'start',
              offset: 10,
              borderRadius: 4,
              borderWidth: 1,
              backgroundColor: (context: any) => {
                return context.dataset.backgroundColor[context.dataIndex];
              },
              borderColor: 'white',
              padding: 6
            }
          }
        }
      });
    } 
  }

}
