import { TestBed } from '@angular/core/testing';

import { HomeFeaturedProductsService } from './home-featured-products.service';

describe('HomeFeaturedProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeFeaturedProductsService = TestBed.get(HomeFeaturedProductsService);
    expect(service).toBeTruthy();
  });
});
