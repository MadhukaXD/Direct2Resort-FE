import { TestBed } from '@angular/core/testing';

import { HomeTopSellersService } from './home-top-sellers.service';

describe('HomeTopSellersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeTopSellersService = TestBed.get(HomeTopSellersService);
    expect(service).toBeTruthy();
  });
});
