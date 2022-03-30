import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSeriesSidebarComponent } from './shop-series-sidebar.component';

describe('ShopSeriesSidebarComponent', () => {
  let component: ShopSeriesSidebarComponent;
  let fixture: ComponentFixture<ShopSeriesSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSeriesSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSeriesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
