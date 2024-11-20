import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
const TITLE='Dashboard';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: TITLE
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
