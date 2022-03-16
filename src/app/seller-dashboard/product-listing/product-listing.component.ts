import { Component, OnInit } from '@angular/core';
import { ProductListingService } from './product-listing.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  productList: any;
  isLoading: boolean = false;

  constructor(private productListingService: ProductListingService) { }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.isLoading = true;
    this.productListingService.getSellerProducts().subscribe(
      (products: any) => {
        this.productList = products.data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }      
    );
  }

  getProductImg(imgs) {
    const productImg = imgs.split(',')[0];
    let styles = {
      'background-image': 'url(http://localhost:8000/uploads/images/'+productImg+')'
    };    
    return styles;    
  }
}
