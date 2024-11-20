import {NgModule} from '@angular/core';
import {ConnectorNameRoutingModule} from './connector-name-routing';
import {ConnectorNameComponent} from './connector-name.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConnectorService } from 'src/app/services/connector.service';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    ConnectorNameRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,MatDialogModule
  ],
  declarations: [ConnectorNameComponent],
  providers: [ConnectorService]
})
export class ConnectorNameModule {
  
}
