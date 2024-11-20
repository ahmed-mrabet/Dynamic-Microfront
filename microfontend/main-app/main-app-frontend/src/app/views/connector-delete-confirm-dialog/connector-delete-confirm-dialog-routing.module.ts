import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnectorDeleteConfirmDialogComponent} from './connector-delete-confirm-dialog.component'
const TITLE = 'User Delete Dialog';
const routes: Routes = [
  {
    path: '',
    component: ConnectorDeleteConfirmDialogComponent,
    data: {
      title: TITLE ,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectorDeleteConfirmDialogRoutingModule {}