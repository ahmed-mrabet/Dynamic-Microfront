import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from '../../services/connection.service';
@Component({
  selector: 'app-select-columns',
  templateUrl: './select-columns.component.html',
  styleUrls: ['./select-columns.component.scss']
})
export class SelectColumnsComponent {
  selectedTable: any = {};
  columns: string[] = [];
  selectedColumns: string[] = [];

  POPUP_TITLE: string = 'Add Charts';
  SELECT_COLUMNS_LABEL: string = 'Select Columns:';
  PREVIOUS_BUTTON_LABEL: string = 'Previous';
  NEXT_BUTTON_LABEL: string = 'Next';

  constructor(private route: ActivatedRoute, 
    private connectionService: ConnectionService, 
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tableName = params['tableName'];
      if (tableName) {
        this.fetchTableData(tableName);
      }
    });
  }


  fetchTableData(tableName: string): void {
    this.connectionService.getTables(1, 10) 
      .subscribe((data: any) => {
        const foundTable = data.tables.find((table: any) => table.tableName === tableName);
        if (foundTable) {
          this.selectedTable = foundTable;
          this.columns = this.getColumnKeys();
          if (this.columns.length > 0) {
            this.selectedColumns = [this.columns[0]]; 
          } else {
            this.selectedColumns = [];
          }
        } 
      }, error => {
        console.error('Error fetching tables:', error);
      });
      
  }


  getColumnKeys(): string[] {
    const columnKeysSet = new Set<string>();
    
    if (this.selectedTable && this.selectedTable.data && this.selectedTable.data.length > 0) {
      const firstColumnToExclude = this.selectedTable.data[0].columnKey; // Example: Column key to exclude (e.g., first column)
  
      this.selectedTable.data.forEach((column: any) => {
        // Check if the current column is not the first column to exclude
        if (column.columnKey !== firstColumnToExclude) {
          columnKeysSet.add(column.columnKey);
        }
      });
    }
    
    return Array.from(columnKeysSet);
  }
  

  goToSelectTableToVisualise(): void {
    if (this.selectedTable) {
      this.router.navigate(['/select-table-to-visualize'], { queryParams: { tableName: this.selectedTable.tableName } });
    } 
  }
  

  goToNextPage(): void {
    if (this.selectedTable) {
      this.router.navigate(['add-new-connection/select-chart'], {
        queryParams: {
          tableName: this.selectedTable.tableName,
          selectedColumns: JSON.stringify(this.selectedColumns),
          selectedTablesLength: this.route.snapshot.queryParams['selectedTablesLength']
        }
      });
    } 
  }

}
