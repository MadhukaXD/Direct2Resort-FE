import { TestBed } from '@angular/core/testing';

import { BuyerDashboardPageService } from './buyer-dashboard-page.service';

describe('BuyerDashboardPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyerDashboardPageService = TestBed.get(BuyerDashboardPageService);
    expect(service).toBeTruthy();
  });
});
