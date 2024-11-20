import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

import { ExposedModule } from './exposed/exposed.module';
import { ViewTablesComponent } from './exposed/view-tables/view-tables.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ExposedModule,
    HttpClientModule,

  ],
  providers: [{provide: ErrorHandler,}],
  bootstrap: [AppComponent]
})
export class AppModule { }
