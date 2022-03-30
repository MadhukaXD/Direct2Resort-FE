import { TestBed } from '@angular/core/testing';

import { SellerRegisterService } from './seller-register.service';

describe('SellerRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerRegisterService = TestBed.get(SellerRegisterService);
    expect(service).toBeTruthy();
  });
});
