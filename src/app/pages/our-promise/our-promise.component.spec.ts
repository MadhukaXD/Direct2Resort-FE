import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPromiseComponent } from './our-promise.component';

describe('OurPromiseComponent', () => {
  let component: OurPromiseComponent;
  let fixture: ComponentFixture<OurPromiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurPromiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurPromiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
