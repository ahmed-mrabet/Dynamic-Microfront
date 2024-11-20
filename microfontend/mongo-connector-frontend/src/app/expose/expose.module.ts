import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExposeRoutingModule } from './expose-routing.module';
import {MongoFormComponent} from "./mongo-form/mongo-form.component";
import {MongoTablesComponent} from "./mongo-tables/mongo-tables.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    MongoFormComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExposeRoutingModule
  ]
})
export class ExposeModule { }
