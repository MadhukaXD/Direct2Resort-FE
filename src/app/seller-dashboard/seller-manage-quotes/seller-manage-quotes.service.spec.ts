import { TestBed } from '@angular/core/testing';

import { SellerManageQuotesService } from './seller-manage-quotes.service';

describe('SellerManageQuotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerManageQuotesService = TestBed.get(SellerManageQuotesService);
    expect(service).toBeTruthy();
  });
});
