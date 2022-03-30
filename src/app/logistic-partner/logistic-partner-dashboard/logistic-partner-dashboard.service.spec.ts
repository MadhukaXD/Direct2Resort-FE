import { TestBed } from '@angular/core/testing';

import { LogisticPartnerDashboardService } from './logistic-partner-dashboard.service';

describe('LogisticPartnerDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogisticPartnerDashboardService = TestBed.get(LogisticPartnerDashboardService);
    expect(service).toBeTruthy();
  });
});
