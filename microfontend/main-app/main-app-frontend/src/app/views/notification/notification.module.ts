import {NgModule} from '@angular/core';

import {NotificationComponent} from './notification.component';
import {NotificationRoutingModule} from './notification-routing.module';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    NotificationRoutingModule,
  ]
})

export class NotificationModule{
}
