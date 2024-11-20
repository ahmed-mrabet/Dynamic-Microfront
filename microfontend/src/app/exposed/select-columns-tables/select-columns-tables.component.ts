import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-select-columns-tables',
  templateUrl: './select-columns-tables.component.html',
  styleUrls: ['./select-columns-tables.component.scss']
})
export class SelectColumnsTablesComponent implements OnInit {
  tablesData: any[] = [];
  columns: { [key: string]: string[] } = {};
  selectedColumns: { [key: string]: string[] } = {};

  POPUP_TITLE: string = 'Add Charts';
  SELECT_COLUMNS_LABEL: string = 'Select Columns for';
  PREVIOUS_BUTTON_LABEL: string = 'Previous';
  NEXT_BUTTON_LABEL: string = 'Next';

  constructor(
    private route: ActivatedRoute,
    private connectionService: ConnectionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tableNames = params['tableNames'];

      if (tableNames) {
        const tableNameArray: string[] = tableNames.split(','); // Explicitly define type as string[]
        tableNameArray.forEach((tableName: string) => this.fetchTableData(tableName)); // Specify type for tableName
      }
    });
  }

  fetchTableData(tableName: string): void {
    this.connectionService.getTables(1, 10)
      .subscribe((data: any) => {
        const foundTable = data.tables.find((table: any) => table.tableName === tableName);
        if (foundTable) {
          this.tablesData.push(foundTable);
          this.columns[tableName] = this.getColumnKeys(foundTable);
          this.selectedColumns[tableName] = this.columns[tableName].length > 0 ? [this.columns[tableName][0]] : [];
        } else {
          console.error(`Table with name '${tableName}' not found.`);
        }
      }, error => {
        console.error('Error fetching tables:', error);
      });
  }
  

  getColumnKeys(table: any): string[] {
    const columnKeysSet = new Set<string>();
    if (table && table.data && table.data.length > 0) {
      for (let i = 1; i < table.data.length; i++) { 
        columnKeysSet.add(table.data[i].columnKey);
      }
      // Remove the last item added to columnKeysSet
      const keysArray = Array.from(columnKeysSet);
      keysArray.pop(); // Remove the last element
      return keysArray;
    }
    return [];
  }
  

  goToSelectTableToVisualize(): void {
    this.router.navigate(['/select-table-to-visualize']);
  }

  goToNextPage(): void {
    this.router.navigate(['add-new-connection/select-chart'], {
      queryParams: {
        tableName: Object.keys(this.selectedColumns).join(','),
        selectedColumns: JSON.stringify(this.selectedColumns),
        selectedTablesLength: this.route.snapshot.queryParams['selectedTablesLength']
      } 
    });
  }

}
