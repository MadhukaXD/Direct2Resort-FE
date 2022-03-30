import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerShippingManagerComponent } from './seller-shipping-manager.component';

describe('SellerShippingManagerComponent', () => {
  let component: SellerShippingManagerComponent;
  let fixture: ComponentFixture<SellerShippingManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerShippingManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerShippingManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
