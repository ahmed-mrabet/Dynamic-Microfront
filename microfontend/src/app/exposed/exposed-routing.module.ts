import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewConnectionComponent } from './add-new-connection/add-new-connection.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ViewTablesComponent } from './view-tables/view-tables.component';
import { SelectColumnsComponent } from './select-columns/select-columns.component';
import { SelectTableToVisualizeComponent } from './select-table-to-visualize/select-table-to-visualize.component';
import { SelectChartComponent } from './select-chart/select-chart.component';
import { GraphChartComponent } from './graph-chart/graph-chart.component';
import { SelectChartGraphAttributesComponent } from './select-chart-graph-attributes/select-chart-graph-attributes.component';
import { SelectChartPieAttributesComponent } from './select-chart-pie-attributes/select-chart-pie-attributes.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PieChartDoughnutComponent } from './pie-chart-doughnut/pie-chart-doughnut.component';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { SelectKpiChartsPieAttributesComponent } from './select-kpi-charts-pie-attributes/select-kpi-charts-pie-attributes.component';
import { SelectColumnsTablesComponent } from './select-columns-tables/select-columns-tables.component';
import { MultiBarChartComponent } from './multi-bar-chart/multi-bar-chart.component';
import { SelectMultiChartAttributesComponent } from './select-multi-chart-attributes/select-multi-chart-attributes.component';
import { MultiGraphChartComponent } from './multi-graph-chart/multi-graph-chart.component';
import { MultiColumnChartComponent } from './multi-column-chart/multi-column-chart.component';

const routes: Routes = [
  {
    path: '',
    component: AddNewConnectionComponent,
    
  },
  {path: 'bar-chart',component: BarChartComponent
  },
  { path: 'select-tables', component: SelectTableToVisualizeComponent },
  { path: 'view-tables', component: ViewTablesComponent },
  { path: 'select-columns', component: SelectColumnsComponent },
  { path: 'select-table-to-visualize', component: SelectTableToVisualizeComponent },
  { path: 'select-chart', component: SelectChartComponent},
  { path: 'select-chart-graph-attributes', component : SelectChartGraphAttributesComponent},
  { path: 'graph-chart', component: GraphChartComponent},
  { path: 'select-chart-pie-attributes', component: SelectChartPieAttributesComponent},
  { path: 'pie-chart', component: PieChartComponent},
  { path: 'pie-chart-doughnut', component: PieChartDoughnutComponent},
  { path: 'bar-chart', component: BarChartComponent},
  { path: 'column-chart', component: ColumnChartComponent},
  { path: 'select-kpi-chart-pie-attributes', component: SelectKpiChartsPieAttributesComponent},
  { path: 'select-columns-tables', component: SelectColumnsTablesComponent},
  { path: 'multi-bar-chart', component: MultiBarChartComponent},
  { path: 'select-multi-chart-attributes', component: SelectMultiChartAttributesComponent},
  { path: 'multi-graph-chart', component: MultiGraphChartComponent},
  { path: 'multi-column-chart', component: MultiColumnChartComponent},
 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExposedRoutingModule { }
