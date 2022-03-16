import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDashboardSidebarComponent } from './buyer-dashboard-sidebar.component';

describe('BuyerDashboardSidebarComponent', () => {
  let component: BuyerDashboardSidebarComponent;
  let fixture: ComponentFixture<BuyerDashboardSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerDashboardSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDashboardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
