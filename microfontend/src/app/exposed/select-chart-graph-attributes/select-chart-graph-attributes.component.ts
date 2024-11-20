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
  selector: 'app-select-chart-graph-attributes',
  templateUrl: './select-chart-graph-attributes.component.html',
  styleUrls: ['./select-chart-graph-attributes.component.scss']
})
export class SelectChartGraphAttributesComponent  implements OnInit{
  TOPBARTITLE = 'Add Charts/';
  SELECTEDTABLEMESSAGE = 'Selected table:';
  SELECTAXISXMESSAGE = 'Select axis X:';
  SELECTAXISYMESSAGE = 'Select axis Y:';
  LABELMESSAGE = 'Label:';
  CHARTNAMEMESSAGE = 'Chart Name:';
  PREVIOUSBUTTONTITLE = 'Previous';
  NEXTBUTTONTITLE = 'Next';
  selectedTable: string = '';
  selectedColumns: string[] = [];
  selectedItem: string = '';
  selectedAxisX: string = '';
  selectedAxisY: string = '';
  labelX: string = '';
  labelY: string = '';
  columnXValues: string[] = [];
  columnYValues: number[] = [];
  yAxisWarning: string = '';
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
      this.selectedItem = params['selectedItem'];
    });
  }
  onAxisXChange(): void {
    this.disableSelectedAxisYOption(this.selectedAxisX);
  }
  onAxisYChange(): void {
    this.disableSelectedAxisXOption(this.selectedAxisY);
  }
  private disableSelectedAxisYOption(selectedValue: string): void {
    const axisYSelect = document.getElementById('selectAxisY') as HTMLSelectElement;
    if (axisYSelect) {
      Array.from(axisYSelect.options).forEach(option => {
        if (option.value === selectedValue) {
          option.disabled = true;
        } else {
          option.disabled = false;
        }
      });
    }
  }
  private disableSelectedAxisXOption(selectedValue: string): void {
    const axisXSelect = document.getElementById('selectAxisX') as HTMLSelectElement;
    if (axisXSelect) {
      Array.from(axisXSelect.options).forEach(option => {
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
  goToNextPage(): void {
    // Fetch data for the selected table
    this.connectionService.getTables(1, 100, this.selectedTable).subscribe(response => {
      const tableData = response?.data;
      if (tableData && tableData.length > 0) {
        // Extract specific column values based on selectedAxisX and selectedAxisY
        this.columnXValues = tableData.filter((row: Row) => row.columnKey === this.selectedAxisX).map((row: Row) => row.columnValue);
        this.columnYValues = tableData.filter((row: Row) => row.columnKey === this.selectedAxisY).map((row: Row) => parseFloat(row.columnValue));
        const invalidValues = this.columnYValues.filter(value => isNaN(value));
        if (invalidValues.length > 0) {
          // Display a warning and prevent navigation if there are invalid values
          this.yAxisWarning = 'Warning: Choose a suitable column for axis Y for visualization';
          return;
        } else {
          this.yAxisWarning = '';
        }
        // Determine the target route based on selectedItem
        const targetRoute = this.selectedItem === 'Graph' ? '/add-new-connection/graph-chart' : (this.selectedItem === 'Column' ? '/add-new-connection/column-chart' : '/add-new-connection/bar-chart');
        const chartData = {
          tableName: this.selectedTable,
          axisX: this.selectedAxisX,
          axisY: this.selectedAxisY,
          labelX: this.labelX,
          labelY: this.labelY,
          chartName: this.chartName,
          selectedItem: this.selectedItem
        };
        this.connectionService.sendChartData(chartData).subscribe(
          response => {
            console.log('Chart data sent successfully:', response);
          },
          error => {
            console.error('Error sending chart data:', error);
          }
        );
       
        // Navigate to the appropriate chart page with the necessary data as query parameters
        setTimeout(() => {
          // Navigate to the desired route after the timeout
          this.router.navigate(['dashboard']);
          
          // Hide loading spinner/message after navigation
          
        }, 2000);
      }
    });
  }

}
