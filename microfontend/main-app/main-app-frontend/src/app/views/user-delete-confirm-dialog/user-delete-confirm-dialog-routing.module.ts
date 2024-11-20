import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserDeleteConfirmDialogComponent} from './user-delete-confirm-dialog.component'
const TITLE = 'User Delete Dialog';
const routes: Routes = [
  {
    path: '',
    component: UserDeleteConfirmDialogComponent,
    data: {
      title: TITLE ,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDeleteConfirmDialogRoutingModule {}