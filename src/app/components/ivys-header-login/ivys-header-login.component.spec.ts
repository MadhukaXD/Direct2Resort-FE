import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysHeaderLoginComponent } from './ivys-header-login.component';

describe('IvysHeaderLoginComponent', () => {
  let component: IvysHeaderLoginComponent;
  let fixture: ComponentFixture<IvysHeaderLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysHeaderLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysHeaderLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
