import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ConnectorService } from 'src/app/services/connector.service';
import { ConnectorDeleteConfirmDialogComponent } from '../connector-delete-confirm-dialog/connector-delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-datasource',
  templateUrl: './datasource.component.html',
  styleUrls: ['./datasource.component.scss']
})

export class DatasourceComponent implements OnInit{
  NO_DATA = 'No data found.';
  TEXT = 'Please connect to a datasource or upload a file.';
  connectorsTab:any[]= [];
  constructor(private connectorService: ConnectorService, private router: Router,private dialog: MatDialog){}
  ngOnInit(): void {
    this.connectorService.getConnectors().pipe().subscribe((connectors)=> this.connectorsTab = connectors);

  }
  viewTables(){
    this.router.navigate(['add-new-connection/view-tables'])
  }
  connectToDatabase(){
    this.router.navigate(['mongo'])
  }
  deleteConnector(id:any){
    this.dialog.open(ConnectorDeleteConfirmDialogComponent,{width:'300px',data: {
      param: id


  }})
}


}
