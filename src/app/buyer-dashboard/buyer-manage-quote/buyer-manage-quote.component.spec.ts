import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerManageQuoteComponent } from './buyer-manage-quote.component';

describe('BuyerManageQuoteComponent', () => {
  let component: BuyerManageQuoteComponent;
  let fixture: ComponentFixture<BuyerManageQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerManageQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerManageQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
