import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultiChartAttributesComponent } from './select-multi-chart-attributes.component';

describe('SelectMultiChartAttributesComponent', () => {
  let component: SelectMultiChartAttributesComponent;
  let fixture: ComponentFixture<SelectMultiChartAttributesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectMultiChartAttributesComponent]
    });
    fixture = TestBed.createComponent(SelectMultiChartAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
