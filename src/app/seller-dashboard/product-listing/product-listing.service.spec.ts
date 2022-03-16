import { TestBed } from '@angular/core/testing';

import { ProductListingService } from './product-listing.service';

describe('ProductListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductListingService = TestBed.get(ProductListingService);
    expect(service).toBeTruthy();
  });
});
