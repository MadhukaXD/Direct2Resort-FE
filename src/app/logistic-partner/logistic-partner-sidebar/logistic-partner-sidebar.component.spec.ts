import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticPartnerSidebarComponent } from './logistic-partner-sidebar.component';

describe('LogisticPartnerSidebarComponent', () => {
  let component: LogisticPartnerSidebarComponent;
  let fixture: ComponentFixture<LogisticPartnerSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticPartnerSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticPartnerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
