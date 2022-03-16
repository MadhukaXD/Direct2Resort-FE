import { TestBed } from '@angular/core/testing';

import { BuyerManageQuoteService } from './buyer-manage-quote.service';

describe('BuyerManageQuoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyerManageQuoteService = TestBed.get(BuyerManageQuoteService);
    expect(service).toBeTruthy();
  });
});
