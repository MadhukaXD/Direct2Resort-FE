import { TestBed } from '@angular/core/testing';

import { SellerQuoteManagementService } from './seller-quote-management.service';

describe('SellerQuoteManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerQuoteManagementService = TestBed.get(SellerQuoteManagementService);
    expect(service).toBeTruthy();
  });
});
