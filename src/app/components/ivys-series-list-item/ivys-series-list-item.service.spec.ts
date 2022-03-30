import { TestBed } from '@angular/core/testing';

import { IvysSeriesListItemService } from './ivys-series-list-item.service';

describe('IvysSeriesListItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IvysSeriesListItemService = TestBed.get(IvysSeriesListItemService);
    expect(service).toBeTruthy();
  });
});
