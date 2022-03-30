import { TestBed } from '@angular/core/testing';

import { ReadyToShipService } from './ready-to-ship.service';

describe('ReadyToShipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadyToShipService = TestBed.get(ReadyToShipService);
    expect(service).toBeTruthy();
  });
});
