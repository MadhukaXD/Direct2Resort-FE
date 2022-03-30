import { TestBed } from '@angular/core/testing';

import { SeriesViewSidebarService } from './series-view-sidebar.service';

describe('SeriesViewSidebarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeriesViewSidebarService = TestBed.get(SeriesViewSidebarService);
    expect(service).toBeTruthy();
  });
});
