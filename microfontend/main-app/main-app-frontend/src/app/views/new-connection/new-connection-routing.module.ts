import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewConnectionComponent } from './new-connection.component';
const TITLE='New Connection'
const routes: Routes = [
  {
    path: '',
    component: NewConnectionComponent,
    data: {
      title: TITLE,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewConnectionRoutingModule {}

