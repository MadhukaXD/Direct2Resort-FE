import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidManagerComponent } from './bid-manager.component';

describe('BidManagerComponent', () => {
  let component: BidManagerComponent;
  let fixture: ComponentFixture<BidManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
