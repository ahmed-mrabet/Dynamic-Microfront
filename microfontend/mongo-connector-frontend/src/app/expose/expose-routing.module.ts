import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MongoFormComponent} from "./mongo-form/mongo-form.component";

const routes : Routes = [
  {path :'',component:MongoFormComponent},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ExposeRoutingModule { }
