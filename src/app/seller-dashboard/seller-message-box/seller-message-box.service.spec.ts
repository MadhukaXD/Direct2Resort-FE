import { TestBed } from '@angular/core/testing';

import { SellerMessageBoxService } from './seller-message-box.service';

describe('SellerMessageBoxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerMessageBoxService = TestBed.get(SellerMessageBoxService);
    expect(service).toBeTruthy();
  });
});
