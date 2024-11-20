import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddedDialogComponent } from './user-added-dialog.component';

describe('UserAddedDialogComponent', () => {
  let component: UserAddedDialogComponent;
  let fixture: ComponentFixture<UserAddedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddedDialogComponent]
    });
    fixture = TestBed.createComponent(UserAddedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
