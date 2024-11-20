import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connector-delete-success-dialog',
  templateUrl: './connector-delete-success-dialog.component.html',
  styleUrls: ['./connector-delete-success-dialog.component.scss']
})
export class ConnectorDeleteSuccessDialogComponent {
  DELETEDSUCCESSFULLY = 'Connector Deleted Successfully!';
  OKBUTTON = 'OK';
  constructor(private router:Router){}
  NavigateToDatasource(){
    location.reload();
    this.router.navigate(['datasource']);
  }

}
