import { Component } from '@angular/core';

@Component({
  selector: 'app-user-deleted-success-dialog',
  templateUrl: './user-deleted-success-dialog.component.html',
  styleUrls: ['./user-deleted-success-dialog.component.scss']
})
export class UserDeletedSuccessDialogComponent {
  DELETEDSUCCESSFULLY = 'User Deleted Successfully!';
  OKBUTTON = 'OK';

}
