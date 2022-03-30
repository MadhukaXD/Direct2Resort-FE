import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysHeaderSearchComponent } from './ivys-header-search.component';

describe('IvysHeaderSearchComponent', () => {
  let component: IvysHeaderSearchComponent;
  let fixture: ComponentFixture<IvysHeaderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysHeaderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysHeaderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
