import {NgModule} from '@angular/core';
import { UserDeletedSuccessDialogComponent } from './user-deleted-success-dialog.component';
import {  UserDeletedSuccessDialogRoutingModule } from './user-deleted-success-dialog-routing.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    declarations: [UserDeletedSuccessDialogComponent],
    imports: [
      MatDialogModule,UserDeletedSuccessDialogRoutingModule,MatButtonModule
    ],
    
  })
  
  export class  UserDeletedSuccessDialogModule{
  }