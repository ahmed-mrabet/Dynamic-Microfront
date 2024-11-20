import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDeletedSuccessDialogComponent } from '../user-deleted-success-dialog/user-deleted-success-dialog.component';

@Component({
  selector: 'app-user-delete-confirm-dialog',
  templateUrl: './user-delete-confirm-dialog.component.html',
  styleUrls: ['./user-delete-confirm-dialog.component.scss']
})
export class UserDeleteConfirmDialogComponent {
  WARNING = 'Do you really want to remove this user ?';
  YESBUTTON= 'Yes';
  NOBUTTON ='No';
  constructor(private dialog: MatDialog){}
  OpenSuccessDialog(){
    this.dialog.open(UserDeletedSuccessDialogComponent,{width: '300px'})
  }

}
