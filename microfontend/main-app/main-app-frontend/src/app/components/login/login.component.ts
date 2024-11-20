import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  constructor(private router:Router){
  }

  DASHBOARD_PATH:any='dashboard';
  WELCOME_TEXT:any = 'Make better decisions, faster with VizWise';
  CONTENT:any ='This is your dynamic data partner, offering intuitive visualizations and actionable insights tailored to your business needs. Empower your team to navigate complex data effortlessly and drive informed decisions with confidence.';
  CLICK:any ='Get started';
  Login(){
    this.router.navigate([this.DASHBOARD_PATH]);
  }

}
