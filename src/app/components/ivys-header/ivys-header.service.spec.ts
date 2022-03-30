import { TestBed } from '@angular/core/testing';

import { IvysHeaderService } from './ivys-header.service';

describe('IvysHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IvysHeaderService = TestBed.get(IvysHeaderService);
    expect(service).toBeTruthy();
  });
});
