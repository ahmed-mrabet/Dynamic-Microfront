import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatasourceComponent } from './datasource.component';
const TITLE='Datasource';
const routes: Routes = [
  {
    path: '',
    component: DatasourceComponent,
    data: {
      title: TITLE,
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatasourceRoutingModule {}

