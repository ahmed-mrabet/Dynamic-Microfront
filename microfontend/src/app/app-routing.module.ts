import { NgModule, ViewRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTablesComponent } from './exposed/view-tables/view-tables.component';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./exposed/exposed.module').then(m =>
      m.ExposedModule)},
 


 
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
