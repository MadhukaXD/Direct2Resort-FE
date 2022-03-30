import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainSliderComponent } from './home-main-slider.component';

describe('HomeMainSliderComponent', () => {
  let component: HomeMainSliderComponent;
  let fixture: ComponentFixture<HomeMainSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMainSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMainSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
