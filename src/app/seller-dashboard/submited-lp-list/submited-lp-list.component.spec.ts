import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitedLpListComponent } from './submited-lp-list.component';

describe('SubmitedLpListComponent', () => {
  let component: SubmitedLpListComponent;
  let fixture: ComponentFixture<SubmitedLpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitedLpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitedLpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
