import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from '../../services/connection.service';
import { forkJoin } from 'rxjs';

interface Row {
  id: number;
  columnKey: string;
  columnValue: string;
  row_id: number;
}

@Component({
  selector: 'app-select-multi-chart-attributes',
  templateUrl: './select-multi-chart-attributes.component.html',
  styleUrls: ['./select-multi-chart-attributes.component.scss']
})
export class SelectMultiChartAttributesComponent  implements OnInit {
  TOPBARTITLE = 'Add Charts/';
  SELECTEDTABLEMESSAGE = 'Selected table:';
  SELECTAXISXMESSAGE = 'Select axis X:';
  SELECTAXISYMESSAGE = 'Select axis Y:';
  LABELMESSAGE = 'Label:';
  CHARTNAMEMESSAGE = 'Name:';
  PREVIOUSBUTTONTITLE = 'Previous';
  NEXTBUTTONTITLE = 'Next';
  AXISLABEL = 'Choose label for each axis:';
  XAXISLABELMESSAGE: string = 'X Axis Label: ';
  YAXISLABELMESSAGE: string = 'Y Axis Label: ';

  selectedColumns: { [key: string]: string[] } = {};
  selectedItem: string = '';
  selectedTable: string = '';
  xAxisLabel: string = '';
  yAxisLabel: string = '';
  selectedAxisX: string[] = [];
  selectedAxisY: string[] = [];
  chartName: string = '';
  yAxisWarning: string = '';
  columnXValues: any[] = [];
  columnYValues: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private connectionService: ConnectionService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedItem = params['selectedItem'];
      this.selectedTable = params['tableName'];
      this.selectedColumns = JSON.parse(params['selectedColumns']);
      this.selectedItem = params['selectedItem'];
      const numTables = Object.keys(this.selectedColumns).length;
      this.selectedAxisX = new Array(numTables).fill('');
      this.selectedAxisY = new Array(numTables).fill('');
    });
   
  }

  onAxisXChange(index: number): void {
    const selectedValue = this.selectedAxisX[index];
    this.disableSelectedAxisYOption(selectedValue, index);
  }

  onAxisYChange(index: number): void {
    const selectedValue = this.selectedAxisY[index];
    this.disableSelectedAxisXOption(selectedValue, index);
  }

  private disableSelectedAxisYOption(selectedValue: string, index: number): void {
    const axisYSelect = document.getElementById(`selectAxisY${index}`) as HTMLSelectElement;
    if (axisYSelect) {
      Array.from(axisYSelect.options).forEach((option: HTMLOptionElement) => {
        option.disabled = option.value === selectedValue;
      });
    }
  }

  private disableSelectedAxisXOption(selectedValue: string, index: number): void {
    const axisXSelect = document.getElementById(`selectAxisX${index}`) as HTMLSelectElement;
    if (axisXSelect) {
      Array.from(axisXSelect.options).forEach((option: HTMLOptionElement) => {
        option.disabled = option.value === selectedValue;
      });
    }
  }

  goToPreviousPage(): void {
    this.router.navigate(['add-new-connection/select-chart'], {
      queryParams: {
        tableName: this.selectedTable,
        selectedColumns: JSON.stringify(this.selectedColumns)
      }
    });
  }

  goToNextPage(): void {
    const tableRequests = Object.keys(this.selectedColumns).map(tableName => {
      return this.connectionService.getTables(1, 100, tableName);
    });
  
    forkJoin(tableRequests).subscribe(responses => {
  
      this.columnXValues = []; // Array to store columnXValues for each table
      this.columnYValues = [];
      this.yAxisWarning = '';
  
      responses.forEach((response, tableIndex) => {
        const tableData = response?.data;
        if (tableData && tableData.length > 0) {
          const xValues = tableData
            .filter((row: Row) => row.columnKey === this.selectedAxisX[tableIndex])
            .map((row: Row) => row.columnValue)
  
          const columnValues = tableData
            .filter((row: Row) => row.columnKey === this.selectedAxisY[tableIndex])
            .map((row: Row) => parseFloat(row.columnValue));
  
          const invalidValues = columnValues.filter((value: number) => isNaN(value));
          if (invalidValues.length > 0) {
            this.yAxisWarning = 'Warning: Choose a suitable column for axis Y for visualization';
            return;
          }
  
          // Push columnXValues and columnYValues for the current table to their respective arrays
          this.columnXValues.push(xValues);
          this.columnYValues.push(columnValues);
        } 
      });
  
      if (!this.yAxisWarning) {
        const targetRoute = this.selectedItem === 'Graph' ? '/add-new-connection/multi-graph-chart' : (this.selectedItem === 'Column' ? '/add-new-connection/multi-column-chart' : '/add-new-connection/multi-bar-chart');
  
        this.router.navigate([targetRoute], {
          queryParams: {
            tableName: this.selectedTable,
            axisX: JSON.stringify(this.selectedAxisX),
            axisY: JSON.stringify(this.selectedAxisY),
            columnXValues: JSON.stringify(this.columnXValues),
            columnYValues: JSON.stringify(this.columnYValues),
            chartName: this.chartName,
            xAxisLabel: this.xAxisLabel, 
            yAxisLabel: this.yAxisLabel 
          }
        });
      } else {
        console.log(this.yAxisWarning);
      }
    });
  }

}
