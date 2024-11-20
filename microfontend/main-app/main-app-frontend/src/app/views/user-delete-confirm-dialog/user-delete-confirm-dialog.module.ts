import {NgModule} from '@angular/core';
import { UserDeleteConfirmDialogComponent } from './user-delete-confirm-dialog.component';
import { UserDeleteConfirmDialogRoutingModule } from './user-delete-confirm-dialog-routing.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [UserDeleteConfirmDialogComponent],
    imports: [
      MatDialogModule,UserDeleteConfirmDialogRoutingModule,MatButtonModule,
    ],
    
  })
  
  export class UserDeleteConfirmDialogModule{
  }