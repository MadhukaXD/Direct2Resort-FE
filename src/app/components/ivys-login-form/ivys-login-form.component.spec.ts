import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysLoginFormComponent } from './ivys-login-form.component';

describe('IvysLoginFormComponent', () => {
  let component: IvysLoginFormComponent;
  let fixture: ComponentFixture<IvysLoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysLoginFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
