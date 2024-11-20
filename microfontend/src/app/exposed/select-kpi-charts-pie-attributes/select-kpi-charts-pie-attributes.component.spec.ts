import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectKpiChartsPieAttributesComponent } from './select-kpi-charts-pie-attributes.component';

describe('SelectKpiChartsPieAttributesComponent', () => {
  let component: SelectKpiChartsPieAttributesComponent;
  let fixture: ComponentFixture<SelectKpiChartsPieAttributesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectKpiChartsPieAttributesComponent]
    });
    fixture = TestBed.createComponent(SelectKpiChartsPieAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
