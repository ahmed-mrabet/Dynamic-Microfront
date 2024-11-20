import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import { KeycloakGuard } from './keycloak.guard';
import {DefaultLayoutComponent} from './containers';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DynamicRemoteComponent } from './views/dynamic-remote/dynamic-remote.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import Remotes from '../../remotes.json'
import { HttpClient } from '@angular/common/http';
const LOGOUT_PATH ='log-out';
const DASHBOARD_PATH ='dashboard';
const NOTIFICATION_PATH ='notification';
const NEW_CONNECTION_PATH ='new-connection';
const DATASOURCE_PATH ='datasource';
const ALERT_PATH ='alert';
const NEW_CONNECTION_DATABASE_PATH ='new-connection-database';
const CONNECTOR_NAME_PATH ='connector-name';
const DASHBOARD_DIALOG_PATH ='dashboard-dialog'
const USERS_PATH = 'users'
import RemoteEntries from '../../remote-entries.json'
export interface MicroFrontend {
  baseUrl: string;
  moduleName: string;
  remoteEntry: string;
  remoteName: string;
  exposedModule: string;
}

const dynamicRoutes: Routes = RemoteEntries.map((mf: { baseUrl: any; remoteEntry: any; remoteName: any; exposedModule: any; moduleName: string | number; }) => ({
  path: mf.baseUrl,
  loadChildren: () =>
    loadRemoteModule({
      remoteEntry: mf.remoteEntry,
      remoteName: mf.remoteName,
      exposedModule: mf.exposedModule,
    }).then(m => m[mf.moduleName])
}));

const staticRoutes: Routes = [
  {path:'',component:LoginComponent},
  
  
  {path: 'log-out',component:LogoutComponent},
  {
    path: '',
    component: DefaultLayoutComponent,canActivate: [KeycloakGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: DASHBOARD_PATH,
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: NOTIFICATION_PATH,
        loadChildren: () =>
          import('./views/notification/notification.module').then((m) => m.NotificationModule)
      },
      {
        path: NEW_CONNECTION_PATH,
        loadChildren: () =>
          import('./views/new-connection/new-connection.module').then((m) => m.NewConnectionModule)
      },
      {
        path: DATASOURCE_PATH,
        loadChildren: () =>
          import('./views/datasource/datasource.module').then((m) => m.DatasourceModule)
      },
      {
        path: ALERT_PATH,
        loadChildren: () =>
          import('./views/alert/alert.module').then((m) => m.AlertModule)
         
      },
      {
        path: NEW_CONNECTION_DATABASE_PATH,
        loadChildren: () =>
          import('./views/new-connection-database/new-connection-database.module').then((m) => m.NewConnectionModule)
         
      },
      {
        path: CONNECTOR_NAME_PATH,
        loadChildren: () =>
          import('./views/connector-name/connector-name.module').then((m) => m.ConnectorNameModule)
         
      },
      {
        path: DASHBOARD_DIALOG_PATH,
        loadChildren: () =>
          import('./views/dashboard-dialog/dashboard-dialog.module').then((m) => m.DashboardDialogModule)
         
      },
       {path:'dynamic-remote',component: DynamicRemoteComponent},
      {path: USERS_PATH,loadChildren:()=> import('./views/users/users.module').then((m)=> m.UsersModule)},
      {path: 'user-added-dialog',loadChildren:()=> import('./views/user-added-dialog/user-added-dialog.module').then((m)=> m.UserAddedDialogModule)},
      {path: 'user-delete-warning',loadChildren:()=> import('./views/user-delete-confirm-dialog/user-delete-confirm-dialog.module').then((m)=> m.UserDeleteConfirmDialogModule)},
      {path:'user-deleted-dialog',loadChildren:()=> import('./views/user-deleted-success-dialog/user-deleted-success-dialog.module').then((m)=> m.UserDeletedSuccessDialogModule)},
      {path:'connector-deployed-dailog',loadChildren:()=> import('./views/connector-deployed-dialog/connector-deployed-dialog.module').then((m)=> m.ConnectorDeployedDialogModule)},
      {path:'connector-delete-warning',loadChildren:()=> import('./views/connector-delete-confirm-dialog/connector-delete-confirm-dialog.module').then((m)=> m.ConnectorDeleteConfirmDialogModule)},
      {path:'connector-delete-success-dailog',loadChildren:()=> import('./views/connector-delete-success-dialog/connector-delete-success-dialog.module').then((m)=> m.UserDeletedSuccessDialogModule)},
        ...dynamicRoutes
      

    
     
    ]
    
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(staticRoutes, {
      
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
