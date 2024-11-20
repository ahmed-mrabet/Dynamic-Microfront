import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-connection',
  templateUrl: './new-connection.component.html',
  styleUrls: ['./new-connection.component.scss']
})

export class NewConnectionComponent {
  NEW_CONNECTION:any='New Connection';
  TYPE:any='Choose Type:';
  API:any='API';
  DATABASE:any='Database';
  DATABASE_PATH:any='new-connection-database';
  FILE:any='File';
  API_PATH:any='api'
  constructor(private router:Router){}
  Api(){
    this.router.navigate([this.API_PATH]);
  }
  Database(){
    this.router.navigate([this.DATABASE_PATH]);
  }
}
