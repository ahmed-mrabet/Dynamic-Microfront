import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardDialogComponent} from './dashboard-dialog.component';
const TITLE='Dashboard-dialog';
const routes: Routes = [
  {
    path: '',
    component: DashboardDialogComponent,
    data: {
      title: TITLE
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardDialogRoutingModule {
}
