import { TestBed } from '@angular/core/testing';

import { HomeNewProductsService } from './home-new-products.service';

describe('HomeNewProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeNewProductsService = TestBed.get(HomeNewProductsService);
    expect(service).toBeTruthy();
  });
});
