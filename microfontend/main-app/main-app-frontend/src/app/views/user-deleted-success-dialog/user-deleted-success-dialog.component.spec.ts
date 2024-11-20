import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeletedSuccessDialogComponent } from './user-deleted-success-dialog.component';

describe('UserDeletedSuccessDialogComponent', () => {
  let component: UserDeletedSuccessDialogComponent;
  let fixture: ComponentFixture<UserDeletedSuccessDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDeletedSuccessDialogComponent]
    });
    fixture = TestBed.createComponent(UserDeletedSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
