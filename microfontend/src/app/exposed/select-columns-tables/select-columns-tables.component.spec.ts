import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColumnsTablesComponent } from './select-columns-tables.component';

describe('SelectColumnsTablesComponent', () => {
  let component: SelectColumnsTablesComponent;
  let fixture: ComponentFixture<SelectColumnsTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectColumnsTablesComponent]
    });
    fixture = TestBed.createComponent(SelectColumnsTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
