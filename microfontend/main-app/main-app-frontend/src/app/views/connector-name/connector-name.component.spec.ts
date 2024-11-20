import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorNameComponent } from './connector-name.component';

describe('ConnectorNameComponent', () => {
  let component: ConnectorNameComponent;
  let fixture: ComponentFixture<ConnectorNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectorNameComponent]
    });
    fixture = TestBed.createComponent(ConnectorNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
