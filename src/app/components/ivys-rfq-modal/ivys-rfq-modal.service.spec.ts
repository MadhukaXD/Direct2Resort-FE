import { TestBed } from '@angular/core/testing';

import { IvysRfqModalService } from './ivys-rfq-modal.service';

describe('IvysRfqModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IvysRfqModalService = TestBed.get(IvysRfqModalService);
    expect(service).toBeTruthy();
  });
});
