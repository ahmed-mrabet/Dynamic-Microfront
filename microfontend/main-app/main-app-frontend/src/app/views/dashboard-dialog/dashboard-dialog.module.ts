import {NgModule} from '@angular/core';
import {DashboardDialogRoutingModule} from './dashboard-dialog-routing';
import {DashboardDialogComponent} from './dashboard-dialog.component';
import {CommonModule } from '@angular/common';
import {
    MatDialogModule,
   
  
  } from '@angular/material/dialog';
  import {FormsModule} from '@angular/forms';
  import {MatInputModule} from '@angular/material/input';
  import {MatSelectModule} from '@angular/material/select';
  import {MatFormFieldModule} from '@angular/material/form-field';
  import { HttpClient,HttpClientModule } from '@angular/common/http';
@NgModule({
    imports: [
      DashboardDialogRoutingModule,CommonModule,MatDialogModule,FormsModule,MatInputModule,MatSelectModule,MatFormFieldModule,HttpClientModule
      
    ],
    declarations: [DashboardDialogComponent],
    providers:[HttpClient]
  })
  export class DashboardDialogModule {
  }