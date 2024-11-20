import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConnectorNameComponent} from './connector-name.component';
const TITLE='Connector Name';
const routes: Routes = [
  {
    path: '',
    component: ConnectorNameComponent,
    data: {
      title: TITLE
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectorNameRoutingModule {
}