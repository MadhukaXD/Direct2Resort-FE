import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysHeaderComponent } from './ivys-header.component';

describe('IvysHeaderComponent', () => {
  let component: IvysHeaderComponent;
  let fixture: ComponentFixture<IvysHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
