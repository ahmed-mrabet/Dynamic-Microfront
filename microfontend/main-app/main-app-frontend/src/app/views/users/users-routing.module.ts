import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{UsersComponent} from './users.component'
const TITLE = 'Users';
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: TITLE ,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}