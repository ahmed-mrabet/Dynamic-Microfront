import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DashboardDialogComponent } from '../dashboard-dialog/dashboard-dialog.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  constructor(private router: Router){}
  ngOnInit(): void {
    this.router.navigate(['alerting'])
    
   
  }

}
