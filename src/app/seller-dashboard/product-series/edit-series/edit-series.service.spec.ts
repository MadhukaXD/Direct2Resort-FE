import { TestBed } from '@angular/core/testing';

import { EditSeriesService } from './edit-series.service';

describe('EditSeriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditSeriesService = TestBed.get(EditSeriesService);
    expect(service).toBeTruthy();
  });
});
