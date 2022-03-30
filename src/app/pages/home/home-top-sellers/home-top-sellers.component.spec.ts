import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTopSellersComponent } from './home-top-sellers.component';

describe('HomeTopSellersComponent', () => {
  let component: HomeTopSellersComponent;
  let fixture: ComponentFixture<HomeTopSellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTopSellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTopSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
