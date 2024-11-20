import { Component, OnInit } from '@angular/core';
import { MongoConnectionService } from '../../mongo-connection.service';

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
    selector: 'app-mongo-tables',
    standalone: true,
    imports: [],
    templateUrl: './mongo-tables.component.html',
    styleUrls: ['./mongo-tables.component.css']
})
export class MongoTablesComponent implements OnInit {
    tables: TableData[] = [];
    selectedTable: TableData | null = null;
    data: Map<string, string>[] = [];
    isLoading: boolean = false;
    VIEW_TABLES_TITLE = 'View Tables';
    NAVBAR_TEXT = 'Connection';
    LEFT_NAVBAR_TEXT = 'Tables';
    SELECT_TABLE_MESSAGE = 'Select a table to view its content.';
    NO_DATA_MESSAGE = 'No data found';

    constructor(private connectionService: MongoConnectionService) { }

    ngOnInit(): void {
        this.fetchTables();
    }

    fetchTables(pageNumber: number = 1, pageSize: number = 10): void {
        this.isLoading = true;
        this.connectionService.fetchData(pageNumber.toString(), pageSize.toString()).subscribe({
            next: (response: any) => {
                this.tables = response; // Adjust based on the actual response structure
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error fetching data:', err);
                this.isLoading = false;
            }
        });
    }

    onListItemClick(table: TableData): void {
        this.selectedTable = table;
        this.processTableData(table);
    }

    processTableData(table: TableData): void {
        this.data = [];
        let tmp: Map<number, Map<string, string>> = new Map();

        table.data.forEach(row => {
            let key = row.row_id;
            if (!tmp.has(key)) {
                tmp.set(key, new Map<string, string>());
            }
            let innerMap = tmp.get(key);
            if (innerMap !== undefined) {
                innerMap.set(row.columnKey, row.columnValue);
            }
        });

        this.data = Array.from(tmp.values()).map(record => {
            let result: Map<string, string> = new Map();
            this.getColumnKeys(table).forEach(columnKey => {
                let value = record.get(columnKey);
                if (value !== undefined) {
                    result.set(columnKey, value);
                }
            });
            return result;
        });
    }

    getColumnKeys(table: TableData): string[] {
        const columnKeysSet = new Set<string>();
        if (table && table.data) {
            table.data.forEach(column => {
                columnKeysSet.add(column.columnKey);
            });
        }
        return Array.from(columnKeysSet);
    }
}


// You can uncomment and use these methods if you need additional functionality
    // onListItemClick(table: TableData): void {
    //   // Process and display selected table data here
    // }



// Properties to store table data and related state
  //tables: TableData[] = [];
  //selectedTable: TableData | null = null;
  //pageNumber: number = 1;
  //pageSize: number = 100;
  //totalTables: number = 0;
  //data: Map<string, string> []= [];



  // ngOnInit(): void {
  //   // Fetch tables when component initializes
  //   this.fetchTables();
  // }

  // fetchTables(): void {
  //   this.connectionService.getTables(+this.pageNumber, +this.pageSize)
  //     .subscribe((data: any) => {
  //       // Update component properties with fetched data
  //       this.tables = data.tables || [];
  //       this.pageNumber = data.pageNumber;
  //       this.pageSize = data.pageSize;
  //       this.totalTables = data.totalTables;
  //     });
  //   this.isloading = true;
  // }
  //
  // // Function triggered on table item click
  // onListItemClick(table: TableData): void {
  //   this.fetchTables();
  //   this.selectedTable = table;
  //   this.data = []
  //
  //   // Temporary map to group table rows by row_id
  //   let tmp :Map<number, Map<string, string>> = new Map()
  //
  //   // Process each row of the selected table data
  //   this.selectedTable.data.forEach((row) => {
  //     let key = row['row_id']
  //     if (!tmp.has(key)) {
  //       tmp.set(key, new Map<string, string>())
  //     }
  //     let innerMap = tmp.get(key);
  //     if (innerMap !== undefined) {
  //       innerMap.set(row['columnKey'], row['columnValue'])
  //     }
  //   });
  //
  //   // Convert grouped row data into an array suitable for display
  //   for(let id of tmp.keys()){
  //     let record = new Map<string, string>()
  //     for (let columnKey of this.getColumnKeys()){
  //       let row = tmp.get(id)
  //       if (row !== undefined){
  //         let column = row.get(columnKey)
  //         if (column !== undefined) {
  //           record.set(columnKey, column)
  //         }
  //       }
  //     }
  //     this.data.push(record)
  //   }
  // }
  //
  // // Function to retrieve unique column keys from selectedTable data
  // getColumnKeys(): string[] {
  //   const columnKeysSet = new Set<string>();
  //   if (this.selectedTable && this.selectedTable.data) {
  //     // Collect unique columnKey values from table data
  //     this.selectedTable.data.forEach(column => {
  //       columnKeysSet.add(column.columnKey);
  //     });
  //   }
  //   return Array.from(columnKeysSet);
  // }




