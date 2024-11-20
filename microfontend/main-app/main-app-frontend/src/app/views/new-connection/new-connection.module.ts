import {NgModule} from '@angular/core';

import {NewConnectionComponent} from './new-connection.component';
import {NewConnectionRoutingModule} from './new-connection-routing.module';

@NgModule({
  declarations: [NewConnectionComponent],
  imports: [

    NewConnectionRoutingModule,


  ]
})
export class NewConnectionModule {
}
