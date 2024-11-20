import {NgModule} from '@angular/core';
import { ConnectorDeleteSuccessDialogComponent } from './connector-delete-success-dialog.component';
import {  ConnectorDeleteSuccessDialogRoutingModule } from './connector-delete-success-dialog-routing.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [ConnectorDeleteSuccessDialogComponent],
    imports: [
      MatDialogModule,ConnectorDeleteSuccessDialogRoutingModule,MatButtonModule,RouterModule
    ],
    
  })
  
  export class  UserDeletedSuccessDialogModule{
  }