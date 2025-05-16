import { TestBed } from '@angular/core/testing';

import { TransferLoginDataService } from './transfer-login-data.service';

describe('TransferLoginDataService', () => {
  let service: TransferLoginDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferLoginDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
