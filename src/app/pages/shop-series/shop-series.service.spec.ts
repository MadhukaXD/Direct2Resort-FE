import { TestBed } from '@angular/core/testing';

import { ShopSeriesService } from './shop-series.service';

describe('ShopSeriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopSeriesService = TestBed.get(ShopSeriesService);
    expect(service).toBeTruthy();
  });
});
