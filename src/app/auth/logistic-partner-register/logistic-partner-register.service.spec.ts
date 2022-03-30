import { TestBed } from '@angular/core/testing';

import { LogisticPartnerRegisterService } from './logistic-partner-register.service';

describe('LogisticPartnerRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogisticPartnerRegisterService = TestBed.get(LogisticPartnerRegisterService);
    expect(service).toBeTruthy();
  });
});
