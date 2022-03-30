import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesProductsComponent } from './series-products.component';

describe('SeriesProductsComponent', () => {
  let component: SeriesProductsComponent;
  let fixture: ComponentFixture<SeriesProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
