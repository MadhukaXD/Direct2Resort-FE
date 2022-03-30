import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticPartnerDashboardComponent } from './logistic-partner-dashboard.component';

describe('LogisticPartnerDashboardComponent', () => {
  let component: LogisticPartnerDashboardComponent;
  let fixture: ComponentFixture<LogisticPartnerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticPartnerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticPartnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
