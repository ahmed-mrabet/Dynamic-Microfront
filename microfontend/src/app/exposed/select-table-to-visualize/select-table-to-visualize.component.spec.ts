import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTableToVisualizeComponent } from './select-table-to-visualize.component';

describe('SelectTableToVisualizeComponent', () => {
  let component: SelectTableToVisualizeComponent;
  let fixture: ComponentFixture<SelectTableToVisualizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectTableToVisualizeComponent]
    });
    fixture = TestBed.createComponent(SelectTableToVisualizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
