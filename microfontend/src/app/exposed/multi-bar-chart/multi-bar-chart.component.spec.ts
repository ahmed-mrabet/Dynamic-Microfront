import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiBarChartComponent } from './multi-bar-chart.component';

describe('MultiBarChartComponent', () => {
  let component: MultiBarChartComponent;
  let fixture: ComponentFixture<MultiBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiBarChartComponent]
    });
    fixture = TestBed.createComponent(MultiBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
