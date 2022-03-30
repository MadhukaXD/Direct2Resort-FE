import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSeriesComponent } from './shop-series.component';

describe('ShopSeriesComponent', () => {
  let component: ShopSeriesComponent;
  let fixture: ComponentFixture<ShopSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
