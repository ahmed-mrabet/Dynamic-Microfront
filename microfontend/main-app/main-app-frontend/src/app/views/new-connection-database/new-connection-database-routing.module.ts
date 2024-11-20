import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NewConnectionDatabaseComponent} from './new-connection-database.component'
const TITLE='New Connection Database';
const routes: Routes = [
  {
    path: '',
    component: NewConnectionDatabaseComponent,
    data: {
      title: TITLE,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewConnectionDatabaseRoutingModule {}

