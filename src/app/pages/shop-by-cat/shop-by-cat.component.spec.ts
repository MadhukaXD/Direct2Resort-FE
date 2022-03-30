import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopByCatComponent } from './shop-by-cat.component';

describe('ShopByCatComponent', () => {
  let component: ShopByCatComponent;
  let fixture: ComponentFixture<ShopByCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopByCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
