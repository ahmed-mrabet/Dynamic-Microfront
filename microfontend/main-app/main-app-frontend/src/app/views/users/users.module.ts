import {NgModule} from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
    declarations: [UsersComponent],
    imports: [
      UsersRoutingModule,MatIconModule,MatDialogModule,CommonModule,MatButtonModule,MatSelectModule,MatTabsModule,MatTableModule,HttpClientModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule
    ],
    providers:[HttpClient,UserService]
  })
  
  export class UsersModule{
  }
  