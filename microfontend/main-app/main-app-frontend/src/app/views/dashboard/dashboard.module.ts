import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ConnectorService } from 'src/app/services/connector.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartService } from 'src/app/services/chart.service';
import { ChartjsModule } from '@coreui/angular-chartjs';
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
  imports: [
    DashboardRoutingModule,CommonModule,MatDialogModule,MatIconModule,HttpClientModule,MatCardModule,MatButtonModule, TextColorDirective, CardComponent, CardBodyComponent,
     RowComponent, ColComponent, ButtonDirective, ButtonGroupComponent, FormCheckLabelDirective,  CardFooterComponent, GutterDirective, ProgressComponent, 
     CardHeaderComponent, TableDirective, AvatarComponent,ChartjsModule
  ],
  declarations: [DashboardComponent],
  providers:[HttpClient,ConnectorService,ChartService]
})
export class DashboardModule {
}
