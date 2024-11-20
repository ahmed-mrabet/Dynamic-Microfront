import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import {apiConfig} from 'src/app/Api'
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private keycloakService: KeycloakService){}
  ngOnInit(): void {
    this.keycloakService.logout(apiConfig.HOME_URL);
      
  }
  

}
