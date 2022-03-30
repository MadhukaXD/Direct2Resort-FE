import { TestBed } from '@angular/core/testing';

import { BuyerMessageBoxService } from './buyer-message-box.service';

describe('BuyerMessageBoxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyerMessageBoxService = TestBed.get(BuyerMessageBoxService);
    expect(service).toBeTruthy();
  });
});
