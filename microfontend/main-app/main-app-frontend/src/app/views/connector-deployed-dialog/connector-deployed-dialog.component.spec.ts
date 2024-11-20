import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorDeployedDialogComponent } from './connector-deployed-dialog.component';

describe('ConnectorDeployedDialogComponent', () => {
  let component: ConnectorDeployedDialogComponent;
  let fixture: ComponentFixture<ConnectorDeployedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectorDeployedDialogComponent]
    });
    fixture = TestBed.createComponent(ConnectorDeployedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
