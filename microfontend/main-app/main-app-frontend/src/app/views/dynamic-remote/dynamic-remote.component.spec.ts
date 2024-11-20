import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRemoteComponent } from './dynamic-remote.component';

describe('DynamicRemoteComponent', () => {
  let component: DynamicRemoteComponent;
  let fixture: ComponentFixture<DynamicRemoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicRemoteComponent]
    });
    fixture = TestBed.createComponent(DynamicRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
