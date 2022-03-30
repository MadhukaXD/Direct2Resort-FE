import { TestBed } from '@angular/core/testing';

import { BidManagerService } from './bid-manager.service';

describe('BidManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BidManagerService = TestBed.get(BidManagerService);
    expect(service).toBeTruthy();
  });
});
