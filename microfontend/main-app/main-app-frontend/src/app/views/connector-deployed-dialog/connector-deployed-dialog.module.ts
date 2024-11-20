import {NgModule} from '@angular/core';
import { ConnectorDeployedDialogComponent } from './connector-deployed-dialog.component';
import {  ConnectorDeployedDialogRoutingModule } from './connector-deployed-dialog-routing.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    declarations: [ConnectorDeployedDialogComponent],
    imports: [
      MatDialogModule,ConnectorDeployedDialogRoutingModule,MatButtonModule
    ],
    
  })
  
  export class  ConnectorDeployedDialogModule{
  }