import {NgModule} from '@angular/core';
import { UserAddedDialogComponent } from './user-added-dialog.component';
import { UserAddedDialogRoutingModule } from './user-added-dialog-routing.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    declarations: [UserAddedDialogComponent],
    imports: [
      MatDialogModule,UserAddedDialogRoutingModule,MatButtonModule
    ],
    
  })
  
  export class UserAddedDialogModule{
  }