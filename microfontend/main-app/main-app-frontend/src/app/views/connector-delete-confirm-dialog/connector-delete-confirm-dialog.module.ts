import {NgModule} from '@angular/core';
import { ConnectorDeleteConfirmDialogComponent } from './connector-delete-confirm-dialog.component';
import { ConnectorDeleteConfirmDialogRoutingModule } from './connector-delete-confirm-dialog-routing.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ConnectorService } from 'src/app/services/connector.service';

@NgModule({
    declarations: [ConnectorDeleteConfirmDialogComponent],
    imports: [
      MatDialogModule,ConnectorDeleteConfirmDialogRoutingModule,MatButtonModule,HttpClientModule 
    ],
    providers:[HttpClient,ConnectorService]
    
  })
  
  export class ConnectorDeleteConfirmDialogModule{
  }