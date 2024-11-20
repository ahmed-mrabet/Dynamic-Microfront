import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-connection-error-dialog',
  templateUrl: './connection-error-dialog.component.html',
  styleUrls: ['./connection-error-dialog.component.scss']
})
export class ConnectionErrorDialogComponent {

  CONNECTIONREFUSED = 'Connection refused. Verify the credentials !';
  OKBUTTON = 'OK';

  constructor(private dialog: MatDialog) { }

  openConnectionDialog(): void {
    const dialogRef = this.dialog.open(ConnectionErrorDialogComponent, {
      width: '400px', // Width of the dialog
      disableClose: true, // Prevent closing by clicking outside or pressing Escape key
      // Additional configuration options for the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
