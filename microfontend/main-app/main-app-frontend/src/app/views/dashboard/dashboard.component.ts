import {Component, OnInit} from '@angular/core';
import { DashboardDialogComponent } from '../dashboard-dialog/dashboard-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { ChartService } from '../../services/chart.service';
import { ConnectorService } from 'src/app/services/connector.service';
Chart.register(...registerables);
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit  {
  dataset: any[] = [];
  chartTab:any[] =[];
  connectorTab:any[] =[];
  constructor(public dialog: MatDialog,  private router: Router,private chartService: ChartService,private connectorService: ConnectorService) { }
  ngOnInit(): void {
    this.connectorService.getConnectors().subscribe(connectors => this.connectorTab = connectors);
    this.chartService.getChartData().subscribe(charts => this.prepareDataAndCreateCharts(charts));
    this.chartService.getChartData().subscribe(charts => this.chartTab = charts);
  }

  private prepareDataAndCreateCharts(charts: any[]): void {
    let chartPromises = charts.map(chart => this.prepareChartData(chart));

    Promise.all(chartPromises).then(preparedCharts => {
      this.dataset = preparedCharts;
    });
  }

  private async prepareChartData(chart: any): Promise<any> {
    const xValues = await this.chartService.getColumnValues(chart.database, chart.tableName, chart.axisX).toPromise();
    const yValues = await this.chartService.getColumnValues(chart.database, chart.tableName, chart.axisY).toPromise();

    return {
      chartName: chart.chartName,
      database: chart.database,
      labels: xValues,
      labelX: chart.labelX,
      labelY: chart.labelY,
      data: yValues,
      selectedItem: chart.selectedItem,
      chartType: this.getChartType(chart.selectedItem),
      chartConfig: this.getChartConfig(xValues, yValues, chart.labelY, chart.labelX)
    };
  }

  private getChartType(selectedItem: string): string {
    switch (selectedItem) {
      case 'Bar':
        return 'bar';
      case 'Graph':
        return 'line';
      case 'Column':
        return 'bar';
      default:
        return 'line';
    }
  }

  private getChartConfig(labels: string[], data: number[], labelY: string, labelX: string): any {
    const colors = [
      'rgba(140, 188, 251, 1)',
      'rgba(223, 240, 216, 1)',
      'rgba(229, 153, 174, 1)',
      'rgba(244, 234, 218, 1)',
      'rgba(232, 234, 246, 1)'
    ];
    return {
      labels: labels,
      datasets: [
        {
          label: labelY,
          data: data,
          borderColor: 'rgba(128, 128, 128, 1)',
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 2,
          fill: false
        }
      ]
    };
  }

  handleChartRef($chartRef: any, data: any) {
    if ($chartRef) {
      console.log('handleChartRef', $chartRef);
      const ctx = $chartRef.ctx;
      ctx.font = '10px Arial';
      ctx.fillStyle = '#000';
      ctx.fillText(`Chart Name: ${data.chartName}`, 10, 20);
      ctx.fillText(`Database: ${data.database}`, 10, 40);
    }
  }

  NO_DATA = 'No data found.';
  TEXT = 'Please connect to a datasource or upload a file.';
  START = 'Start data visualization';
  ADD = 'Add';
  ADD_CIRCLE = 'add_circle';
  DASHBOARD_PATH = '/dashboard';

  SelectInstance() {
    this.openConnectionDialog();
  }

  openConnectionDialog(): void {
    const dialogRef = this.dialog.open(DashboardDialogComponent, {
      width: '500px',
      disableClose: true,
    });
  }
}
