import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSingleRfqComponent } from './seller-single-rfq.component';

describe('SellerSingleRfqComponent', () => {
  let component: SellerSingleRfqComponent;
  let fixture: ComponentFixture<SellerSingleRfqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerSingleRfqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerSingleRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
