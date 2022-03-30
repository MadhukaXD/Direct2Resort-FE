import { TestBed } from '@angular/core/testing';

import { HomeMainSliderService } from './home-main-slider.service';

describe('HomeMainSliderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeMainSliderService = TestBed.get(HomeMainSliderService);
    expect(service).toBeTruthy();
  });
});
