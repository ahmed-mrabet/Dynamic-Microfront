import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from '../../services/connection.service';
interface Row {
  id: number;
  columnKey: string;
  columnValue: string;
  row_id: number;
}
@Component({
  selector: 'app-select-kpi-charts-pie-attributes',
  templateUrl: './select-kpi-charts-pie-attributes.component.html',
  styleUrls: ['./select-kpi-charts-pie-attributes.component.scss']
})
export class SelectKpiChartsPieAttributesComponent implements OnInit {
  TOPBARTITLE = 'Add Charts/Pie';
  SELECTEDTABLEMESSAGE = 'Selected table:';
  SELECTEDCOLUMNMESSAGE = 'Selected column:'
  LABELMESSAGE = 'Label:';
  DATAMESSAGE = 'Data:';
  CHARTNAMEMESSAGE = 'Chart Name:';
  PREVIOUSBUTTONTITLE = 'Previous';
  NEXTBUTTONTITLE = 'Next';

  selectedTable: string = '';
  selectedColumns: string[] = [];
  selectedLabels: string = '';
  selectedData: string = '';
  columnLabelsValues: string[] = [];
  columnDataValues: number[] = [];
  dataWarning: string = '';
  index: string = '';
  chartName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedTable = params['tableName'];
      this.selectedColumns = JSON.parse(params['selectedColumns']);
      this.index = params['index'];

    });
  }

  goToPreviousPage(): void {
    this.router.navigate(['/add-new-connection/select-chart'], { 
      queryParams: { 
        tableName: this.selectedTable,
        selectedColumns: JSON.stringify(this.selectedColumns) 
      } 
    }); 
  }


  goToPieKpiPage(): void {

        this.connectionService.getTables(1, 100, this.selectedTable).subscribe(response => {
            const tableData = response?.data;
            if (tableData && tableData.length > 0) {
                const selectedColumnData = tableData.filter((row: Row) => this.selectedColumns.includes(row.columnKey));
                const labelCountsMap: { [label: string]: number } = {};
                selectedColumnData.forEach((row: Row) => {
                    labelCountsMap[row.columnValue] = (labelCountsMap[row.columnValue] || 0) + 1;
                });
                this.columnLabelsValues = Object.keys(labelCountsMap);
                this.columnDataValues = Object.values(labelCountsMap);
                let route: string;
                if (this.index === '0') {
                    route = '/add-new-connection/pie-chart';
                } else if (this.index === '1') {
                    route = '/add-new-connection/pie-chart-doughnut';
                } else {
                    console.error('Invalid index');
                    return;
                }
                this.router.navigate([route], {
                    queryParams: {
                        tableName: this.selectedTable,
                        labels: this.selectedLabels,
                        data: this.selectedData,
                        columnLabelsValues: JSON.stringify(this.columnLabelsValues),
                        columnDataValues: JSON.stringify(this.columnDataValues), // Send columnDataValues without percentages
                        chartName: this.chartName
                    }
                });
            } 
        });
    
}

}
