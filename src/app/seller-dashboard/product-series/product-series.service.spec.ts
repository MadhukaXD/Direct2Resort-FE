import { TestBed } from '@angular/core/testing';

import { ProductSeriesService } from './product-series.service';

describe('ProductSeriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSeriesService = TestBed.get(ProductSeriesService);
    expect(service).toBeTruthy();
  });
});
