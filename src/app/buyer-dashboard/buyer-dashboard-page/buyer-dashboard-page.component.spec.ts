import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDashboardPageComponent } from './buyer-dashboard-page.component';

describe('BuyerDashboardPageComponent', () => {
  let component: BuyerDashboardPageComponent;
  let fixture: ComponentFixture<BuyerDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerDashboardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
