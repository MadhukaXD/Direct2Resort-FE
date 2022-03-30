import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductListingService } from './product-listing.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { SnotifyService } from 'ng-snotify';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  productList: any;
  isLoading: boolean = false;
  selectedFilter: string;

  constructor(private productListingService: ProductListingService, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.selectedFilter = 'all';
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: false
    };
    this.getProductList();
  }

  getProductList() {
    this.isLoading = true;
    this.productListingService.getSellerProducts(this.selectedFilter).subscribe(
      (products: any) => {
        this.productList = products.data;
        this.isLoading = false;
        this.rerender();
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
      'background-image': 'url('+productImg+')'
    };    
    return styles;    
  }

  outOfStock(productId: string) {
    this.isLoading = true;
    this.productListingService.setOutOfStock(productId).subscribe(
      data => {
        this.isLoading = false;
        if(data.affectedRows) {
          this.snotifyService.success('Product updated');
        }
        this.getProductList();
      },
      (error) => {
        this.isLoading = false;
        this.snotifyService.error(error.statusText);
        console.log(error);       
      }
    )
  }

  inStock(productId: string) {
    this.isLoading = true;
    this.productListingService.setInStock(productId).subscribe(
      data => {
        this.isLoading = false;
        if(data.affectedRows) {
          this.snotifyService.success('Product updated');
        }
        this.getProductList();
      },
      (error) => {
        this.isLoading = false;
        this.snotifyService.error(error.statusText);
        console.log(error);       
      }
    )
  }

  delete(productId: string) {
    this.snotifyService.confirm('Are you sure you want to delete this product?', {
      closeOnClick: false,
      backdrop: 0.6,
      buttons: [
        {text: 'Yes', action: (toast) => {
          this.isLoading = true;
          this.productListingService.deleteProduct(productId).subscribe(
            data => {
              this.isLoading = false;
              if(data.affectedRows) {
                this.snotifyService.success('Product deleted');
              }
              this.getProductList();
            },
            (error) => {
              this.isLoading = false;
              this.snotifyService.error(error.statusText);
              console.log(error);       
            }
          );
          this.snotifyService.remove(toast.id);
        }},
        {text: 'No', action: (toast) => {this.snotifyService.remove(toast.id);}}
      ]
    });
  }

  filterQuoteList(filter: string) {
    this.selectedFilter = filter;
    this.getProductList();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
