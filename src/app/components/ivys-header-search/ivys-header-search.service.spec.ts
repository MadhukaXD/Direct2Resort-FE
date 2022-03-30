import { TestBed } from '@angular/core/testing';

import { IvysHeaderSearchService } from './ivys-header-search.service';

describe('IvysHeaderSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IvysHeaderSearchService = TestBed.get(IvysHeaderSearchService);
    expect(service).toBeTruthy();
  });
});
