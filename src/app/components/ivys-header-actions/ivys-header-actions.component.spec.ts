import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysHeaderActionsComponent } from './ivys-header-actions.component';

describe('IvysHeaderActionsComponent', () => {
  let component: IvysHeaderActionsComponent;
  let fixture: ComponentFixture<IvysHeaderActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysHeaderActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysHeaderActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
