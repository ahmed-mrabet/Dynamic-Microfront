import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionService } from '../services/connection.service';
import { ExposedRoutingModule } from './exposed-routing.module';
import { AddNewConnectionComponent } from './add-new-connection/add-new-connection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConnectionDialogComponent } from './connection-dialog/connection-dialog.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { ConnectionErrorDialogComponent } from './connection-error-dialog/connection-error-dialog.component';
import { GraphChartComponent } from './graph-chart/graph-chart.component';
import { MultiBarChartComponent } from './multi-bar-chart/multi-bar-chart.component';
import { MultiColumnChartComponent } from './multi-column-chart/multi-column-chart.component';
import { MultiGraphChartComponent } from './multi-graph-chart/multi-graph-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PieChartDoughnutComponent } from './pie-chart-doughnut/pie-chart-doughnut.component';
import { SelectChartComponent } from './select-chart/select-chart.component';
import { SelectChartGraphAttributesComponent } from './select-chart-graph-attributes/select-chart-graph-attributes.component';
import { SelectChartPieAttributesComponent } from './select-chart-pie-attributes/select-chart-pie-attributes.component';
import { SelectColumnsComponent } from './select-columns/select-columns.component';
import { SelectColumnsTablesComponent } from './select-columns-tables/select-columns-tables.component';
import { SelectKpiChartsPieAttributesComponent } from './select-kpi-charts-pie-attributes/select-kpi-charts-pie-attributes.component';
import { SelectMultiChartAttributesComponent } from './select-multi-chart-attributes/select-multi-chart-attributes.component';
import { SelectTableToVisualizeComponent } from './select-table-to-visualize/select-table-to-visualize.component';
import { ViewTablesComponent } from './view-tables/view-tables.component';



@NgModule({
  declarations: [
    AddNewConnectionComponent,
    ConnectionDialogComponent,
    BarChartComponent,
    ColumnChartComponent,
    ConnectionErrorDialogComponent,
    GraphChartComponent,
    MultiBarChartComponent,
    MultiColumnChartComponent,
    MultiGraphChartComponent,
    PieChartComponent,
    PieChartDoughnutComponent,
    SelectChartComponent,
    SelectChartGraphAttributesComponent,
    SelectChartPieAttributesComponent,
    SelectColumnsComponent,
    SelectColumnsTablesComponent,
    SelectKpiChartsPieAttributesComponent,
    SelectMultiChartAttributesComponent,
    SelectTableToVisualizeComponent,
    ViewTablesComponent
    
  ],
  imports: [
   CommonModule,HttpClientModule,
    ExposedRoutingModule,ReactiveFormsModule,FormsModule,MatDialogModule, MatButtonModule,MatIconModule, MatFormFieldModule,MatSelectModule
  ],
  providers:[ConnectionService,HttpClient]
})
export class ExposedModule { }
