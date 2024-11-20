
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {NgScrollbarModule} from 'ngx-scrollbar';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './app.init';
import { KeycloakGuard } from './keycloak.guard';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import{ChartjsComponent} from '@coreui/angular-chartjs';

// Import routing module
import {AppRoutingModule} from './app-routing.module';

// Import app component
import {AppComponent} from './app.component';

// Import containers
import {DefaultHeaderComponent, DefaultLayoutComponent} from './containers'; 
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  HeaderModule,
  NavModule,
  SidebarModule,
  

} from '@coreui/angular';

import {IconModule, IconSetService} from '@coreui/icons-angular';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DynamicRemoteComponent } from './views/dynamic-remote/dynamic-remote.component';
import { HttpClient, HttpClientModule, HttpHandler } from "@angular/common/http";







const APP_CONTAINERS = [
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [AppComponent, APP_CONTAINERS, LoginComponent, LogoutComponent, DynamicRemoteComponent  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    SidebarModule,
    BadgeModule,
    CardModule,
    NgScrollbarModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,ChartjsComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },HttpClient,
    KeycloakService,
    KeycloakGuard,
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
