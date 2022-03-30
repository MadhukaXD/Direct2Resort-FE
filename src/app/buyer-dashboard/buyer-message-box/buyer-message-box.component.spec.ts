import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerMessageBoxComponent } from './buyer-message-box.component';

describe('BuyerMessageBoxComponent', () => {
  let component: BuyerMessageBoxComponent;
  let fixture: ComponentFixture<BuyerMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
