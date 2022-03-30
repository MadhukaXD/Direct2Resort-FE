import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitedToLpComponent } from './submited-to-lp.component';

describe('SubmitedToLpComponent', () => {
  let component: SubmitedToLpComponent;
  let fixture: ComponentFixture<SubmitedToLpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitedToLpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitedToLpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
