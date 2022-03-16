import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerManageQuotesComponent } from './seller-manage-quotes.component';

describe('SellerManageQuotesComponent', () => {
  let component: SellerManageQuotesComponent;
  let fixture: ComponentFixture<SellerManageQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerManageQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerManageQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
