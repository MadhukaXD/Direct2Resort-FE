import { TestBed } from '@angular/core/testing';

import { ReadyToShipManageService } from './ready-to-ship-manage.service';

describe('ReadyToShipManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadyToShipManageService = TestBed.get(ReadyToShipManageService);
    expect(service).toBeTruthy();
  });
});
