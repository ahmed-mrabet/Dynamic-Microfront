import { TestBed } from '@angular/core/testing';

import { MongoConnectionService } from './mongo-connection.service';

describe('MongoConnectionService', () => {
  let service: MongoConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongoConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
