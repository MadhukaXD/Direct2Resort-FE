import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  productList: any;
  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.shopService.getAllProduct().subscribe(
      data => {
        this.productList = data.data;
        console.log(data);        
      }
    )
  }
}
