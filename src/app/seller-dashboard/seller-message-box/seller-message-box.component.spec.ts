import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerMessageBoxComponent } from './seller-message-box.component';

describe('SellerMessageBoxComponent', () => {
  let component: SellerMessageBoxComponent;
  let fixture: ComponentFixture<SellerMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
