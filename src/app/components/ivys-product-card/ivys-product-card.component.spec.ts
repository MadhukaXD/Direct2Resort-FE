import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysProductCardComponent } from './ivys-product-card.component';

describe('IvysProductCardComponent', () => {
  let component: IvysProductCardComponent;
  let fixture: ComponentFixture<IvysProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysProductCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
