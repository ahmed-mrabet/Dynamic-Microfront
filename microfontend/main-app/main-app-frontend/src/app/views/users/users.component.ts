import { Component } from '@angular/core';
import {UserService} from '../../services/user.service'
import { FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import {UserAddedDialogComponent} from '../user-added-dialog/user-added-dialog.component'
import { UserDeleteConfirmDialogComponent } from '../user-delete-confirm-dialog/user-delete-confirm-dialog.component';
export interface PeriodicElement {
  username: string;
  firstName: number;
  lastName: number;
  email: string;
}
interface Role {
  value: string;
  
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  roles: Role[] = [
    {value: 'ADMIN' },
    {value: 'USER' },
    {value: 'VIEWER' },
  ];
  constructor(private userService: UserService, private dialog: MatDialog){
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage = 'Not a valid email';
    } else {
      this.emailErrorMessage = '';
    }
  }
  OpenSuccessDialog(){
    this.dialog.open(UserAddedDialogComponent, {
      width: '400px'
    })
  }
  OpenDialog(){
    this.dialog.open(UserDeleteConfirmDialogComponent,{width:'300px'})
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  emailErrorMessage = '';
  usersTab:any[] =[];
  displayedColumns: string[] = ['username', 'first Name', 'last Name', 'email'];
  displayedColumnsForRemove: string[]= ['username','action']
  ELEMENT_DATA:any=  this.userService.getUsers().subscribe((users)=> this.usersTab = users )

}
