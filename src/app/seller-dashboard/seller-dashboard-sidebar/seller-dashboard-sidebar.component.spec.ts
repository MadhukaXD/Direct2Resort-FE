import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashboardSidebarComponent } from './seller-dashboard-sidebar.component';

describe('SellerDashboardSidebarComponent', () => {
  let component: SellerDashboardSidebarComponent;
  let fixture: ComponentFixture<SellerDashboardSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDashboardSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDashboardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
