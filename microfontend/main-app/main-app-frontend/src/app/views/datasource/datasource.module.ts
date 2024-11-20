import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {DatasourceComponent} from './datasource.component';
import {DatasourceRoutingModule} from './datasource-routing.module';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ConnectorService } from 'src/app/services/connector.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {
AvatarComponent,
ButtonDirective,
ButtonGroupComponent,
CardBodyComponent,
CardComponent,
CardFooterComponent,
CardHeaderComponent,
ColComponent,
FormCheckLabelDirective,
GutterDirective,
ProgressComponent,
RowComponent,
TableDirective,
TextColorDirective
} from '@coreui/angular';
@NgModule({
  declarations: [DatasourceComponent],
  imports: [
    AvatarComponent,
    ButtonDirective,
    ButtonGroupComponent,
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    CardHeaderComponent,
    ColComponent,
    FormCheckLabelDirective,
    GutterDirective,
    ProgressComponent,
    RowComponent,
    TableDirective,
    TextColorDirective,
    DatasourceRoutingModule,MatButtonModule,HttpClientModule,CommonModule,MatCardModule,MatIconModule,MatDialogModule
  ],
  providers:[HttpClient, ConnectorService]
})
export class DatasourceModule {
}
