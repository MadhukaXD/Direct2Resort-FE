import { TestBed } from '@angular/core/testing';

import { ShopByCatService } from './shop-by-cat.service';

describe('ShopByCatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopByCatService = TestBed.get(ShopByCatService);
    expect(service).toBeTruthy();
  });
});
