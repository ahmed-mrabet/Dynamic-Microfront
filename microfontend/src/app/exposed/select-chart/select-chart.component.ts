import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Config from '../../../../config.json'

@Component({
  selector: 'app-select-chart',
  templateUrl: './select-chart.component.html',
  styleUrls: ['./select-chart.component.scss']
})
export class SelectChartComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  CONNECTORNAME = Config.ConnectorName;
  SELECTCHARTMESSAGE = 'Select chart type to visualize.';
  RIGHTCONTENTTITLE = 'Charts';

  CHARTTYPE: string[] = [
    'Bar',
    'Column',
    'Pie',
    'Graph'
  ];

  tableName: string = '';
  selectedColumns: string[] = [];
  selectedColumnsCount: number = 0;
  selectedTablesLength: number = 0;

  selectedItem: string = 'Bar';
  selectedImages: string[] = ['assets/images/bar1.png', 'assets/images/bar2.png'];

  itemsWithImages = [
    { name: 'Bar', images: ['assets/images/bar1.png', 'assets/images/bar2.png'] },
    { name: 'Column', images: ['assets/images/column1.png', 'assets/images/column2.png'] },
    { name: 'Pie', images: ['assets/images/pie1.png', 'assets/images/pie2.png'] },
    { name: 'Graph', images: ['assets/images/graph1.png', 'assets/images/graph2.png'] }
  ];

  filteredItemsWithImages = this.itemsWithImages;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tableName = params['tableName'];
      const selectedColumnsParam = params['selectedColumns'];

      if (typeof selectedColumnsParam === 'string') {
        this.selectedColumns = JSON.parse(selectedColumnsParam);
        this.selectedColumnsCount = this.selectedColumns.length;
      } else if (typeof selectedColumnsParam === 'object' && selectedColumnsParam !== null) {
        this.selectedColumns = selectedColumnsParam;
        this.selectedColumnsCount = Object.keys(selectedColumnsParam).reduce((count, key) => count + selectedColumnsParam[key].length, 0);
      }

      this.selectedTablesLength = +params['selectedTablesLength']; // Convert to number
    });

    console.log("tableName", this.tableName);
    console.log("selectedColumns", this.selectedColumns);
    console.log("selectedColumnsCount", this.selectedColumnsCount);
    console.log("selectedTablesLength", this.selectedTablesLength);
  }

  selectItem(item: string) {
    this.selectedItem = item;
    const selectedItemObject = this.itemsWithImages.find(obj => obj.name === item);
    this.selectedImages = selectedItemObject ? selectedItemObject.images : [];
  }

  goToPreviousPage(): void {
    this.router.navigate(['add-new-connection/select-columns'], { 
      queryParams: { 
        tableName: this.tableName 
      } 
    });
  }

  onImageClick(index: number) {
    const commonQueryParams = {
      tableName: this.tableName,
      selectedColumns: JSON.stringify(this.selectedColumns),
      selectedColumnsCount: this.selectedColumnsCount,
      selectedItem: this.selectedItem
    };

    if (this.selectedItem === 'Graph' && index === 0) {
      this.router.navigate(['add-new-connection/select-chart-graph-attributes'], {
        queryParams: commonQueryParams
      });
    } else if (this.selectedItem === 'Pie' && (index === 0 || index === 1)) {
      if (this.selectedColumnsCount === 2) {
        this.router.navigate(['add-new-connection/select-chart-pie-attributes'], {
          queryParams: {
            ...commonQueryParams,
            index: index.toString()
          }
        });
      } else if (this.selectedColumnsCount === 1) { // Check if selectedColumnsCount is 1
        this.router.navigate(['add-new-connection/select-kpi-chart-pie-attributes'], {
          queryParams: {
            ...commonQueryParams,
            index: index.toString()
          }
        });
      } else {
        console.log("Pie chart requires exactly 1 or 2 selected columns."); // Handle other cases
      }
    } else if ((this.selectedItem === 'Bar' || this.selectedItem === 'Column' || this.selectedItem === 'Graph') && index === 0) {
      this.router.navigate(['add-new-connection/select-chart-graph-attributes'], {
        queryParams: commonQueryParams
      });
    } else if ((this.selectedItem === 'Bar' || this.selectedItem === 'Column' || this.selectedItem === 'Graph') && index === 1 && this.selectedTablesLength === 2) {
      this.router.navigate(['add-new-connection/select-multi-chart-attributes'], {
        queryParams: commonQueryParams
      });
    }
  }

  isButtonDisabled(item: string, index: number): boolean {
    if (this.selectedTablesLength === 1) {
      return (item !== 'Pie' && index === 1); 
    } else if (this.selectedTablesLength === 2) {
      return (item === 'Pie' || (index === 0 && item !== 'Pie')); 
    }
    return false; 
  }
  

}
