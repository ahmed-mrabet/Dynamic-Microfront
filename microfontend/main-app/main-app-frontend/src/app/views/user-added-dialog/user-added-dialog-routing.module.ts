import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserAddedDialogComponent} from './user-added-dialog.component'
const TITLE = 'User Added Dialog';
const routes: Routes = [
  {
    path: '',
    component: UserAddedDialogComponent,
    data: {
      title: TITLE ,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAddedDialogRoutingModule {}