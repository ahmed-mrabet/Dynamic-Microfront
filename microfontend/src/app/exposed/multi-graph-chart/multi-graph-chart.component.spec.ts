import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiGraphChartComponent } from './multi-graph-chart.component';

describe('MultiGraphChartComponent', () => {
  let component: MultiGraphChartComponent;
  let fixture: ComponentFixture<MultiGraphChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiGraphChartComponent]
    });
    fixture = TestBed.createComponent(MultiGraphChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
