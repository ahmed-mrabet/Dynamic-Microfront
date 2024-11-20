import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongoFormComponent } from './mongo-form.component';

describe('MongoFormComponent', () => {
  let component: MongoFormComponent;
  let fixture: ComponentFixture<MongoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MongoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MongoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
