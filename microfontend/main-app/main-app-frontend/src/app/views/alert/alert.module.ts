import {NgModule} from '@angular/core';
import { AlertComponent } from './alert.component';
import { AlertRoutingModule } from './alert-routing.module';
@NgModule({
    declarations: [AlertComponent],
    imports: [
      AlertRoutingModule,
    ]
  })
  export class AlertModule {
  }