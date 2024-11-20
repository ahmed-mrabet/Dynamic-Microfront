import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConnectionDatabaseComponent } from './new-connection-database.component';

describe('NewConnectionDatabaseComponent', () => {
  let component: NewConnectionDatabaseComponent;
  let fixture: ComponentFixture<NewConnectionDatabaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewConnectionDatabaseComponent]
    });
    fixture = TestBed.createComponent(NewConnectionDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
