import {NgModule} from '@angular/core';

import {NewConnectionDatabaseComponent} from './new-connection-database.component';
import {NewConnectionDatabaseRoutingModule} from './new-connection-database-routing.module';

@NgModule({
  declarations: [NewConnectionDatabaseComponent],
  imports: [

    NewConnectionDatabaseRoutingModule,


  ]
})
export class NewConnectionModule {
}
