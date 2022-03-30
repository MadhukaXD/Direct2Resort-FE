import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysBackToTopComponent } from './ivys-back-to-top.component';

describe('IvysBackToTopComponent', () => {
  let component: IvysBackToTopComponent;
  let fixture: ComponentFixture<IvysBackToTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysBackToTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysBackToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
