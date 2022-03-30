import { TestBed } from '@angular/core/testing';

import { SubmitedToLpService } from './submited-to-lp.service';

describe('SubmitedToLpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmitedToLpService = TestBed.get(SubmitedToLpService);
    expect(service).toBeTruthy();
  });
});
