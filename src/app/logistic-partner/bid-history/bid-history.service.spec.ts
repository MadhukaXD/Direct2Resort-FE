import { TestBed } from '@angular/core/testing';

import { BidHistoryService } from './bid-history.service';

describe('BidHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BidHistoryService = TestBed.get(BidHistoryService);
    expect(service).toBeTruthy();
  });
});
