import { TestBed } from '@angular/core/testing';

import { SellerProductSingleService } from './seller-product-single.service';

describe('SellerProductSingleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerProductSingleService = TestBed.get(SellerProductSingleService);
    expect(service).toBeTruthy();
  });
});
