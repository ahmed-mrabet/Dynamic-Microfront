import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartDoughnutComponent } from './pie-chart-doughnut.component';

describe('PieChartDoughnutComponent', () => {
  let component: PieChartDoughnutComponent;
  let fixture: ComponentFixture<PieChartDoughnutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieChartDoughnutComponent]
    });
    fixture = TestBed.createComponent(PieChartDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
