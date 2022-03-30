import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductSingleComponent } from './seller-product-single.component';

describe('SellerProductSingleComponent', () => {
  let component: SellerProductSingleComponent;
  let fixture: ComponentFixture<SellerProductSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProductSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProductSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
