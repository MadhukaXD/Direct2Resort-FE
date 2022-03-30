import { TestBed } from '@angular/core/testing';

import { SubmitedLpListService } from './submited-lp-list.service';

describe('SubmitedLpListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmitedLpListService = TestBed.get(SubmitedLpListService);
    expect(service).toBeTruthy();
  });
});
