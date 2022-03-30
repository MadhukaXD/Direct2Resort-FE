import { TestBed } from '@angular/core/testing';

import { IvysHeaderUserProfileService } from './ivys-header-user-profile.service';

describe('IvysHeaderUserProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IvysHeaderUserProfileService = TestBed.get(IvysHeaderUserProfileService);
    expect(service).toBeTruthy();
  });
});
