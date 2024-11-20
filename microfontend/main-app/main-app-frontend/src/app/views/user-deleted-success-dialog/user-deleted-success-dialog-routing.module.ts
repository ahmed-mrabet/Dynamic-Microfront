import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserDeletedSuccessDialogComponent} from './user-deleted-success-dialog.component'
const TITLE = 'User Deleted Successfully Dialog';
const routes: Routes = [
  {
    path: '',
    component: UserDeletedSuccessDialogComponent,
    data: {
      title: TITLE ,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDeletedSuccessDialogRoutingModule {}