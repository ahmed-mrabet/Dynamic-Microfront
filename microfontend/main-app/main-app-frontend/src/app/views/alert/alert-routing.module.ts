import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlertComponent} from './alert.component'
const TITLE = 'Alerts';
const routes: Routes = [
    {
      path: '',
      component: AlertComponent,
      data: {
        title: TITLE,
      },
    },
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AlertRoutingModule {}