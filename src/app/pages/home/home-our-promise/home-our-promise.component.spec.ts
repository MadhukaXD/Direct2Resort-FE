import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOurPromiseComponent } from './home-our-promise.component';

describe('HomeOurPromiseComponent', () => {
  let component: HomeOurPromiseComponent;
  let fixture: ComponentFixture<HomeOurPromiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOurPromiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOurPromiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
