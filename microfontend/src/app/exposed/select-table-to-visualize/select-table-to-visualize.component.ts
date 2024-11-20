import { ChangeDetectorRef, Component } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { ActivatedRoute, Router } from '@angular/router';
interface TableColumn {
  columnKey: string;
  columnValue: any;
  row_id: number;
}

interface TableData {
  tableName: string;
  data: TableColumn[];
}
@Component({
  selector: 'app-select-table-to-visualize',
  templateUrl: './select-table-to-visualize.component.html',
  styleUrls: ['./select-table-to-visualize.component.scss']
})
export class SelectTableToVisualizeComponent {
  selectedTables: string[] = [];
  tables: TableData[] = [];
  pageNumber: number = 1;
  pageSize: number = 20;
  totalTables : number = 6;

  POPUP_TITLE: string = 'Add Charts';
  SELECT_TABLE_LABEL: string = 'Select tables:';
  PREVIOUS_BUTTON_LABEL: string = 'Previous';
  NEXT_BUTTON_LABEL: string = 'Next';

  constructor(
    private connectionService: ConnectionService, 
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) { }


    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const tableNames = params['tableName'];
        if (tableNames) {
          this.selectedTables = tableNames.split(',');
        this.fetchTables();
        } else {
          this.fetchTables(); // Fetch tables without specifying the selected table
        }
      });
    }
    

    fetchTables(): void {
      this.connectionService.getTables(this.pageNumber, this.pageSize)
        .subscribe((data: any) => {
          this.tables = data.tables || [];
          this.pageNumber = data.pageNumber;
          this.pageSize = data.pageSize;
          this.totalTables = data.totalTables;
          this.changeDetectorRef.detectChanges();
        });
    }

    goToSelectColumns(): void {
      if (this.selectedTables.length === 1) {
        // If only one table is selected, navigate to /select-columns
        this.router.navigate(['add-new-connection/select-columns'], { 
          queryParams: { 
            tableName: this.selectedTables[0],
            selectedTablesLength: this.selectedTables.length
          } 
        });
      } else if (this.selectedTables.length === 2) {
        // If two tables are selected, navigate to /select-columns-tables
        this.router.navigate(['add-new-connection/select-columns-tables'], { 
          queryParams: { 
            tableNames: this.selectedTables.join(','),
            selectedTablesLength: this.selectedTables.length
          } 
        });
      }
    }

}
