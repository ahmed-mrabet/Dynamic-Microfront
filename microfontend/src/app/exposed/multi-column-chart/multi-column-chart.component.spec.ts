import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiColumnChartComponent } from './multi-column-chart.component';

describe('MultiColumnChartComponent', () => {
  let component: MultiColumnChartComponent;
  let fixture: ComponentFixture<MultiColumnChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiColumnChartComponent]
    });
    fixture = TestBed.createComponent(MultiColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
