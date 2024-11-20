import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: './dashboard-dialog.component.html',
  styleUrls: ['./dashboard-dialog.component.scss']
})
export class DashboardDialogComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router, private connectorService: ConnectorService) {
   
  }
  selectedConnector:any;
  connectorsTab:any[]= [];
  ngOnInit(): void {
   this.connectorService.getConnectors().pipe().subscribe((connectors)=> this.connectorsTab = connectors);
   
  }
  onDialogClose(): void {
    if (this.selectedConnector) {
      const selectedConnectorObject = this.connectorsTab.find((connector)=> connector.name === this.selectedConnector);
      if (selectedConnectorObject) {
        console.log('Selected Connector URL:', selectedConnectorObject.url);
        this.router.navigate(['add-new-connection/select-tables'])
    } }
    
   
    
  }
  
 
  
  MAT_DIALOG_TITLE= 'Add chart';
  MAT_DIALOG_DESCRIPTION= 'Select Connector';
  MAT_DIALOG_BUTTON= 'OK';
  MAT_DIALOG_LABEL ='Available connectors'
  
  
  
   

}
