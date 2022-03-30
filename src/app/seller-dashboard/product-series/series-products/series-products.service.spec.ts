import { TestBed } from '@angular/core/testing';

import { SeriesProductsService } from './series-products.service';

describe('SeriesProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeriesProductsService = TestBed.get(SeriesProductsService);
    expect(service).toBeTruthy();
  });
});
