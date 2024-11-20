import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorDeleteConfirmDialogComponent } from './connector-delete-confirm-dialog.component';

describe('ConnectorDeleteConfirmDialogComponent', () => {
  let component: ConnectorDeleteConfirmDialogComponent;
  let fixture: ComponentFixture<ConnectorDeleteConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectorDeleteConfirmDialogComponent]
    });
    fixture = TestBed.createComponent(ConnectorDeleteConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
