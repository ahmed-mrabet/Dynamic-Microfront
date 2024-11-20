import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connector-deployed-dialog',
  templateUrl: './connector-deployed-dialog.component.html',
  styleUrls: ['./connector-deployed-dialog.component.scss']
})
export class ConnectorDeployedDialogComponent {
  DEPLOYEDSUCCESSFULLY= 'Connector Deployed Successfully';
  OKBUTTON= 'OK'
  constructor(private router:Router){}
  NavigateToDatasource(){
    this.router.navigate(['datasource']);
  }

}
