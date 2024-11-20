import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChartPieAttributesComponent } from './select-chart-pie-attributes.component';

describe('SelectChartPieAttributesComponent', () => {
  let component: SelectChartPieAttributesComponent;
  let fixture: ComponentFixture<SelectChartPieAttributesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectChartPieAttributesComponent]
    });
    fixture = TestBed.createComponent(SelectChartPieAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
