import {Component, Input} from '@angular/core';
import {HeaderComponent} from '@coreui/angular';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  PROFILE:any ='profile';
  LOCK_ACCOUNT:any ='Lock Account';
  MANAGE_USERS:any ='Manage Users'
  constructor(private keycloakService: KeycloakService) {
    super();
  }
  public username():string{
    return this.keycloakService.getUsername();
  }
}
