import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChartGraphAttributesComponent } from './select-chart-graph-attributes.component';

describe('SelectChartGraphAttributesComponent', () => {
  let component: SelectChartGraphAttributesComponent;
  let fixture: ComponentFixture<SelectChartGraphAttributesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectChartGraphAttributesComponent]
    });
    fixture = TestBed.createComponent(SelectChartGraphAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
