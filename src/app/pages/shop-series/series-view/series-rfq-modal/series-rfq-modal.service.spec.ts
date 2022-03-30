import { TestBed } from '@angular/core/testing';

import { SeriesRfqModalService } from './series-rfq-modal.service';

describe('SeriesRfqModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeriesRfqModalService = TestBed.get(SeriesRfqModalService);
    expect(service).toBeTruthy();
  });
});
