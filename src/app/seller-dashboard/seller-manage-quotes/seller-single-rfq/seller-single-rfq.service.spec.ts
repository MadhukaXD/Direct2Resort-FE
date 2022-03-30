import { TestBed } from '@angular/core/testing';

import { SellerSingleRfqService } from './seller-single-rfq.service';

describe('SellerSingleRfqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerSingleRfqService = TestBed.get(SellerSingleRfqService);
    expect(service).toBeTruthy();
  });
});
