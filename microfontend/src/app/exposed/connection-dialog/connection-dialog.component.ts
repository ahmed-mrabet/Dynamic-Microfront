import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-connection-dialog',
  templateUrl: './connection-dialog.component.html',
  styleUrls: ['./connection-dialog.component.scss']
})
export class ConnectionDialogComponent {
  CONNECTEDSUCCESSFULLY = 'Connected Successfully!';
  OKBUTTON = 'OK';
  
  constructor(private dialog: MatDialog, private router: Router) { }

  
  

}
