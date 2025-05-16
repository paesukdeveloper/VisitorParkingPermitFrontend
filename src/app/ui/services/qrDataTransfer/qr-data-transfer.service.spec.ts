import { TestBed } from '@angular/core/testing';

import { QrDataTransferService } from './qr-data-transfer.service';

describe('QrDataTransferService', () => {
  let service: QrDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
