import { TestBed } from '@angular/core/testing';

import { RfqModalService } from './rfq-modal.service';

describe('RfqModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RfqModalService = TestBed.get(RfqModalService);
    expect(service).toBeTruthy();
  });
});
