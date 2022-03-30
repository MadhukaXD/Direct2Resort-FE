import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysPageHeaderComponent } from './ivys-page-header.component';

describe('IvysPageHeaderComponent', () => {
  let component: IvysPageHeaderComponent;
  let fixture: ComponentFixture<IvysPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
