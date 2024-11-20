import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConnectorService } from 'src/app/services/connector.service';
import { ConnectorDeleteSuccessDialogComponent } from '../connector-delete-success-dialog/connector-delete-success-dialog.component';

@Component({
  selector: 'app-connector-delete-confirm-dialog',
  templateUrl: './connector-delete-confirm-dialog.component.html',
  styleUrls: ['./connector-delete-confirm-dialog.component.scss']
})
export class ConnectorDeleteConfirmDialogComponent  {
  WARNING = 'Do you really want to remove this connector ?';
  YESBUTTON= 'Yes';
  NOBUTTON ='No';
  constructor(private dialog: MatDialog, private connectorService: ConnectorService,@Inject(MAT_DIALOG_DATA) public data: any){}

  
  DeleteConnector(){
    this.connectorService.deleteConnector(this.data.param).pipe()
.subscribe();
this.dialog.open(ConnectorDeleteSuccessDialogComponent,{width: '300px'})    
  }
  OpenSuccessDialog(){
    
  }

}
