import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-connection-database',
  templateUrl: './new-connection-database.component.html',
  styleUrls: ['./new-connection-database.component.scss']
})
export class NewConnectionDatabaseComponent {
  NEW_CONNECTION_DATABASE = 'New-Connection-Database';
  TYPE ='Choose database:'
  CONNECTOR_NAME_PATH = 'connector-name';
  constructor(private router:Router){}
  ConnectorName(DB_TYPE: string){
    this.router.navigate([this.CONNECTOR_NAME_PATH], {queryParams:{type: DB_TYPE}});

  }

}
