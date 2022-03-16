import { TestBed } from '@angular/core/testing';

import { MyQuotesService } from './my-quotes.service';

describe('MyQuotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyQuotesService = TestBed.get(MyQuotesService);
    expect(service).toBeTruthy();
  });
});
