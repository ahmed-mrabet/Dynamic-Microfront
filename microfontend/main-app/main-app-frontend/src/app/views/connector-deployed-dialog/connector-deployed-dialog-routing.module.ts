import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnectorDeployedDialogComponent} from './connector-deployed-dialog.component'
const TITLE = 'User Deleted Successfully Dialog';
const routes: Routes = [
  {
    path: '',
    component:ConnectorDeployedDialogComponent,
    data: {
      title: TITLE ,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectorDeployedDialogRoutingModule {}