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
  selector: 'app-select-chart-pie-attributes',
  templateUrl: './select-chart-pie-attributes.component.html',
  styleUrls: ['./select-chart-pie-attributes.component.scss']
})
export class SelectChartPieAttributesComponent  implements OnInit {

  TOPBARTITLE = 'Add Charts/Pie';
  SELECTEDTABLEMESSAGE = 'Selected table:';
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

  onlabelsChange(): void {
    this.disableselectedDataOption(this.selectedLabels);
  }

  onAxisYChange(): void {
    this.disableselectedLabelsOption(this.selectedData);
  }

  private disableselectedDataOption(selectedValue: string): void {
    const dataSelect = document.getElementById('selectAxisY') as HTMLSelectElement;
    if (dataSelect) {
      Array.from(dataSelect.options).forEach(option => {
        if (option.value === selectedValue) {
          option.disabled = true;
        } else {
          option.disabled = false;
        }
      });
    }
  }

  private disableselectedLabelsOption(selectedValue: string): void {
    const labelsSelect = document.getElementById('selectlabels') as HTMLSelectElement;
    if (labelsSelect) {
      Array.from(labelsSelect.options).forEach(option => {
        if (option.value === selectedValue) {
          option.disabled = true;
        } else {
          option.disabled = false;
        }
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

  goToPiePage(): void {
    // Fetch data for the selected table
    this.connectionService.getTables(1, 100, this.selectedTable).subscribe(response => {
      const tableData = response?.data;

      if (tableData && tableData.length > 0) {
        // Extract specific column values based on selectedLabels and selectedData
        this.columnLabelsValues = tableData.filter((row: Row) => row.columnKey === this.selectedLabels).map((row: Row) => row.columnValue);
        this.columnDataValues = tableData.filter((row: Row) => row.columnKey === this.selectedData).map((row: Row) => parseFloat(row.columnValue));
        const invalidValues = this.columnDataValues.filter(value => isNaN(value));
        if (invalidValues.length > 0) {
          // Display a warning and prevent navigation if there are invalid values
          this.dataWarning = 'Warning: Choose a suitable column for data for visualization';
          return;
        } else {
          this.dataWarning = '';
        }

        let route: string;
      if (this.index === '0') {
        route = '/add-new-connection/pie-chart';
      } else if (this.index === '1') {
        route = '/add-new-connection/pie-chart-doughnut';
      } else {
        console.error('Invalid index');
        return;
      }

        // Navigate to the graph page with the necessary data as query parameters
        this.router.navigate([route], {
          queryParams: {
            tableName: this.selectedTable,
            labels: this.selectedLabels,
            data: this.selectedData,
            columnLabelsValues: JSON.stringify(this.columnLabelsValues),
            columnDataValues: JSON.stringify(this.columnDataValues),
            chartName: this.chartName
          }
        });
      } 
    });
  }
}
