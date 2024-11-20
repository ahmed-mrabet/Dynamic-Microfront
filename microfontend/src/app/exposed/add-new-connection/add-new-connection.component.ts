import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConnectionDialogComponent } from '../connection-dialog/connection-dialog.component';
import { ConnectionService } from 'src/app/services/connection.service';
import { ConnectionErrorDialogComponent } from '../connection-error-dialog/connection-error-dialog.component';
@Component({
  selector: 'app-add-new-connection',
  templateUrl: './add-new-connection.component.html',
  styleUrls: ['./add-new-connection.component.scss']
})
export class AddNewConnectionComponent {
  NEW_CONNECTION_TITLE = 'New Connection';
  CONNECTED_TO_LABEL = 'Connected to:';
  PORT_LABEL = 'Port:';
  SERVER_LABEL = 'Server:';
  USERNAME_LABEL = 'Username:';
  PASSWORD_LABEL = 'Password:';
  DATABASE_LABEL = 'Database:';
  PREVIOUS_BUTTON_TEXT = 'Previous';
  CONNECT_BUTTON_TEXT = 'Connect';

  // Constants for error messages
  PORT_REQUIRED_ERROR = 'Port is required.';
  PORT_NUMBER_ERROR = 'Port must be a number.';
  SERVER_REQUIRED_ERROR = 'Server is required.';
  USERNAME_REQUIRED_ERROR = 'Username is required.';
  PASSWORD_REQUIRED_ERROR = 'Password is required.';
  DATABASE_REQUIRED_ERROR = 'Database is required.';

  databaseOptions = [
    { value: 'MySQL', label: 'MySQL' },
    { value: 'PostgreSQL', label: 'PostgreSQL' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'Oracle', label: 'Oracle' }
  ];

  constructor(private dialog: MatDialog, private router: Router, private connectionService:ConnectionService) { }

  selectedTable: string = 'MySQL';
  host: string = '';
  port: number | undefined;
  user: string = '';
  password: string = '';
  database: string = '';

  isFormSubmitted: boolean = false;
  private subscription: Subscription | undefined;

  isValidForm(): boolean {
    // Check if all required fields are filled out
    return !!this.port && !!this.host && !!this.user && !!this.password && !!this.database;
  }

  isValidPort(): boolean {
    // Check if portNumber is a valid number
    return !isNaN(Number(this.port));
  }
  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(ConnectionDialogComponent, {
      width: '300px'
    });
    this.router.navigate(['datasource'])
  }
  connect(): void {
    this.isFormSubmitted = true;

    if (this.isValidForm() && this.isValidPort()) {

      const connectorDbConfig = {
        host: this.host,
        port: this.port,
        user: this.user,
        password: this.password,
        database: this.database
      };

      this.connectionService.connect(connectorDbConfig)
        .subscribe(
          (response) => {
            
            this.openSuccessDialog();
          },
          (error) => {
            console.error('Error connecting to database.', error);
            this.openErrorDialog();
          }
        );
    } else {
      console.log('Please fill out all required fields.');
    }
  }
  openErrorDialog(): void {
    const dialogRef = this.dialog.open(ConnectionErrorDialogComponent, {
      width: '300px'
    });

   
  }

 }
