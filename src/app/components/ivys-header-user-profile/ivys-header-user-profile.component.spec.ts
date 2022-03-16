import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysHeaderUserProfileComponent } from './ivys-header-user-profile.component';

describe('IvysHeaderUserProfileComponent', () => {
  let component: IvysHeaderUserProfileComponent;
  let fixture: ComponentFixture<IvysHeaderUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysHeaderUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysHeaderUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
