import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongoTablesComponent } from './mongo-tables.component';

describe('MongoTablesComponent', () => {
  let component: MongoTablesComponent;
  let fixture: ComponentFixture<MongoTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MongoTablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MongoTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
