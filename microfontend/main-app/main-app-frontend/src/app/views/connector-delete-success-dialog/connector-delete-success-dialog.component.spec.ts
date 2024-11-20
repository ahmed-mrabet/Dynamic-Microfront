import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorDeleteSuccessDialogComponent } from './connector-delete-success-dialog.component';

describe('ConnectorDeleteSuccessDialogComponent', () => {
  let component: ConnectorDeleteSuccessDialogComponent;
  let fixture: ComponentFixture<ConnectorDeleteSuccessDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectorDeleteSuccessDialogComponent]
    });
    fixture = TestBed.createComponent(ConnectorDeleteSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
