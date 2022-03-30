import { TestBed } from '@angular/core/testing';

import { BuyerRegisterService } from './buyer-register.service';

describe('BuyerRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyerRegisterService = TestBed.get(BuyerRegisterService);
    expect(service).toBeTruthy();
  });
});
