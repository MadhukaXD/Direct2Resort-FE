import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AddProductService } from './add-product.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product: any;
  files: File[] = [];
  imgPath: any;
  productVariations: any;
  productCategories: any;
  productSubCats: any;
  productSpecifications: any;
  productImgs: any;
  public Editor = ClassicEditor;
  countryList: any;
  unitList: any;
  dutyRates: any;

  isLoading: boolean = false;
  isLoadingCategories: boolean = false;
  isLoadingSubCats: boolean = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImgList: any = [];
  imgSelector: any;
  imgGallaryOrLog: string;
  brandLogoSelector: any;
  brandLogo: any = null;

  isDutyIdEmpty: boolean = false;

  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','image'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

  public editorContent: string = 'My Document\'s Title'
  customTabName: string;
  customTabs: any[] = [];

  lgpAgreement: boolean;

  keyword = 'name';

  modalRef: BsModalRef;
  @ViewChild('imageCropper') imgCropperModal: ElementRef;
  
  constructor(private addProductService: AddProductService, private snotifyService: SnotifyService, private router: Router, private modalService: BsModalService, private imageCompress: NgxImageCompressService) { }

  ngOnInit() {
    
    this.productImgs = [];
    this.productVariations = [];

    this.product = {
      product_name: '',
      product_price: '',
      min_order_qty: '',
      product_desc: '',
      product_unit: '',
      product_country: '',
      shipping_method: '',
      SubProductCategories_sub_prod_cat_id: '',
      SubProductCategories_ProductCategories_product_cat_id: '',      
      product_spec_desc: '',
      product_qty: '',
      dutyid: '',
      itemCode: '',
      offer_samples: false,
      sustainable_product: false,
      product_sample_price: 0
    };

    this.getProductCats();
    this.getCountries();
    this.getUnits();
    this.getDutyRateData();

    this.customTabs.push({
      product_cus_tab_name: 'Product Specifications',
      product_cus_tab_desc: '',
      disabled: false,
      removable: false
    });
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.addProductService.imgUpload(this.files).subscribe(
      data => {
        this.productImgs = data.data;
      }
    )
  }
  
 

  getImg(file) {
    let imgData;
   /* let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      imgData = reader.result;
    }    */ 
  }

  addVariant() {
    const emptyVariant = {
      vKey: '',
      vValues: [
        {
          vValue: ''
        }
      ]
    }
    if(this.productVariations.length !== 3) {
      this.productVariations.push(emptyVariant);
    }
  }

  addProductVariantData(obj) {
    const emptyVariantData = {
      vValue: ''
    }
    obj.vValues.push(emptyVariantData);    
  }

  removeProductVariantData(variantDataList, index) {
    if(variantDataList.length > 1) {
      variantDataList.splice(index, 1);
    }    
  }

  removeVarition(variationList, index) {
    variationList.splice(index, 1);
  }

  getProductCats() {
    this.isLoadingCategories = true;
    this.addProductService.getProductCategories().subscribe(
    cats => {
      this.productCategories = cats.data;
      this.isLoadingCategories = false;
    },
    () => {
      this.productCategories = [];
      this.isLoadingCategories = false;
    });
  }

  getSubCats(e) {
    this.isLoadingSubCats = true;
    if(e.target.value) {
      this.addProductService.getSubProductCategories(e.target.value).subscribe(
        subCats => {
          this.productSubCats = subCats.data;
          this.isLoadingSubCats = false;
        },
        () => {
          this.isLoadingSubCats = false;
          this.productSubCats = [];
        });
    } else {
      this.isLoadingSubCats = false;
      this.productSubCats = [];
    }    
  }

  getSpecifications(e) {
    if(e.target.value !== '') {
      this.addProductService.getSubProductSpecifications(e.target.value).subscribe(
        (specifications: any) => {
          this.productSpecifications = specifications.data;
        });
    }    
  }

  addNewTab(): void {
    const newTabIndex = this.customTabs.length + 1;
    if(this.customTabs.length < 2) {
      this.customTabs.push({
        product_cus_tab_name: this.customTabName,
        product_cus_tab_desc: '',
        disabled: false,
        removable: true
      });
      this.customTabName = '';
    } else {
      this.snotifyService.warning('You can only add one custom tab');
    } 
  }

  removeTabHandler(tab: any): void {
    this.customTabs.splice(this.customTabs.indexOf(tab), 1);
  }

  addProduct() {    
    if(this.croppedImgList.length > 0) {
      if(this.brandLogo !== null) {
        if(this.product.dutyid > 0) {
          this.isDutyIdEmpty = false;
          this.isLoading = true;
          this.product.product_imgs = this.croppedImgList;
          this.product.brandLogo = [this.brandLogo];
          this.product.product_variants = this.productVariations;
          this.product.customTabs = this.customTabs;
          this.product.product_specifications = this.productVariantFormat(this.productSpecifications);
          this.product.product_qty = 0;
          this.product.product_price = parseFloat(this.product.product_price);
          this.product.min_order_qty = parseInt(this.product.min_order_qty);
          this.addProductService.addProduct(this.product).subscribe(resProd => {
            this.isLoading = false;
            this.snotifyService.success('Product Added');
            this.router.navigate(['seller/product-listing']);
          }, 
          (err) => {
            this.isLoading = false;
            this.snotifyService.error(err.error);
          });
        } else {
          this.isDutyIdEmpty = true;
        }
      } else {
        this.snotifyService.warning('Please add brand logo');
      }      
    } else {
      this.snotifyService.warning('Please add product images');
    }
  }

  productVariantFormat(specObj): any{
    const formatedVariants = [];
    specObj.forEach(pSpecification => {
      formatedVariants.push({attr_key: pSpecification.cat_spec_attr_metas, attr_value: pSpecification.value});
    });
    return formatedVariants;
  }

  getCountries(){
    this.addProductService.getCountryList().subscribe((countries: any) => this.countryList = countries.data);
  }

  getUnits(){
    this.addProductService.getUnitsList().subscribe((units: any) => this.unitList = units.data);
  }

  getDutyRateData() {
    this.addProductService.getDutyRate().subscribe(
      data => {
        this.dutyRates = data;
      }
    )
  }

  dutySelect(e: any) {
    this.product.dutyid = e.id;
  }

  clearDuty(e: any) {
    this.product.dutyid = 0;    
  }

   /*--- IMG CROPPING ---*/
  fileChangeEvent(event: any, type: string): void {
    let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$"); //add or remove required extensions here
    let regexTest = regex.test(event.target.files[0].name.toLowerCase());
    
    if(regexTest) {
      const imgSize = parseFloat((event.target.files[0].size / (1024*1024)).toFixed(2));
      if(imgSize > 1) {
        this.snotifyService.warning('Please upload an image lower than 1Mb');
      } else {
        this.imgGallaryOrLog = type;
        this.imageChangedEvent = event;
        
        this.modalRef = this.modalService.show(this.imgCropperModal, {
          backdrop: true,
          ignoreBackdropClick: true,
          class: 'img-cropper-modal'
        });      
      } 
    } else {
      this.snotifyService.warning('Please upload valid image');
    }
  }

  imageCropped(event: ImageCroppedEvent) {
      this.imageCompress.compressFile(event.base64, 50, 45).then(
        result => {          
          this.croppedImage = result;
        }
      );
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  showHoverImgNotice() {
    this.snotifyService.html(`
        <div class="">2nd Image will be used as product hover image</div>
        <br>
        <div class="snotifyToast__body">
          <img src="assets/images/hover_img.gif"/>
        </div> `, {
        buttons: [
          {text: 'Ok', action: (toast) => { this.snotifyService.remove(toast.id); }, bold: true},
        ],
        timeout: 0,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        backdrop: 0.5,
        type: 'confirm'
      });
  }

  addCroppedImg() {
    if(this.imgGallaryOrLog === 'gallery') {
      if(this.croppedImgList.length < 5) {
        this.croppedImgList.push(this.croppedImage);
      } else {
        this.snotifyService.warning('Only 5 product images allowed to upload');
      }      
    } else {
      this.brandLogo = this.croppedImage;
    }
    
    this.modalRef.hide();
    this.croppedImage = '';
    this.imgSelector = '';    
  }

  removeImg(index) {
    this.croppedImgList.splice(index, 1);
  }

  removeBrandLogo() {
    this.brandLogo = null;
    this.brandLogoSelector = '';
  }
}
