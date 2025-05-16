import { TestBed } from '@angular/core/testing';

import { VisitorParkingService } from './visitor-parking.service';

describe('VisitorParkingService', () => {
  let service: VisitorParkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorParkingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
