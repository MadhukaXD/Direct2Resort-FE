import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRelatedProductsComponent } from './product-related-products.component';

describe('ProductRelatedProductsComponent', () => {
  let component: ProductRelatedProductsComponent;
  let fixture: ComponentFixture<ProductRelatedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRelatedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRelatedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
