import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdBannersComponent } from './home-ad-banners.component';

describe('HomeAdBannersComponent', () => {
  let component: HomeAdBannersComponent;
  let fixture: ComponentFixture<HomeAdBannersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAdBannersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAdBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
