import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnectorDeleteSuccessDialogComponent} from './connector-delete-success-dialog.component'
const TITLE = 'Connector Deleted Successfully Dialog';
const routes: Routes = [
  {
    path: '',
    component: ConnectorDeleteSuccessDialogComponent,
    data: {
      title: TITLE ,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectorDeleteSuccessDialogRoutingModule {}