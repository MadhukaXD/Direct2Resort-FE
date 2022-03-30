import { TestBed } from '@angular/core/testing';

import { SellerShippingManagerService } from './seller-shipping-manager.service';

describe('SellerShippingManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerShippingManagerService = TestBed.get(SellerShippingManagerService);
    expect(service).toBeTruthy();
  });
});
