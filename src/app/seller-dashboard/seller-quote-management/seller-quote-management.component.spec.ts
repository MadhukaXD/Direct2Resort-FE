import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerQuoteManagementComponent } from './seller-quote-management.component';

describe('SellerQuoteManagementComponent', () => {
  let component: SellerQuoteManagementComponent;
  let fixture: ComponentFixture<SellerQuoteManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerQuoteManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerQuoteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
