import { TestBed } from '@angular/core/testing';

import { SeriesViewService } from './series-view.service';

describe('SeriesViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeriesViewService = TestBed.get(SeriesViewService);
    expect(service).toBeTruthy();
  });
});
