import { TestBed } from '@angular/core/testing';

import { ShopSeriesSidebarService } from './shop-series-sidebar.service';

describe('ShopSeriesSidebarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopSeriesSidebarService = TestBed.get(ShopSeriesSidebarService);
    expect(service).toBeTruthy();
  });
});
