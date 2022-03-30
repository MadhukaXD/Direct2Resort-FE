import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticPartnerRegisterComponent } from './logistic-partner-register.component';

describe('LogisticPartnerRegisterComponent', () => {
  let component: LogisticPartnerRegisterComponent;
  let fixture: ComponentFixture<LogisticPartnerRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticPartnerRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticPartnerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
