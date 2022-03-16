import { Component, OnInit } from '@angular/core';
import { AddProductService } from './add-product.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

  isLoading: boolean = false;

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

  constructor(private addProductService: AddProductService) { }

  ngOnInit() {
    this.productImgs = [];
    this.productVariations = [
      {
        product_variant_type: 'Color',
        variationData: [
          {
            product_variant_data_name: 'Blue',
            product_variant_data_price: '230'
          },
          {
            product_variant_data_name: 'Green',
            product_variant_data_price: '230'
          }
        ]
      },
      {
        product_variant_type: 'Size',
        variationData: [
          {
            product_variant_data_name: '20.00cm',
            product_variant_data_price: '650'
          }
        ]
      }
    ];

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
      product_qty: ''      
    };

    this.getProductCats();
    this.getCountries();
    this.getUnits();
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.addProductService.imgUpload(this.files).subscribe(
      data => {
        this.productImgs = data.data;
      }
    )
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
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
      product_variant_type: '',
      variationData: [
        {
          product_variant_data_name: '',
          product_variant_data_price: ''
        }
      ]
    }
  
    this.productVariations.push(emptyVariant);
  }

  addProductVariantData(obj) {
    const emptyVariantData = {
      product_variant_data_name: '',
      product_variant_data_price: ''
    }
    obj.variationData.push(emptyVariantData);    
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
    this.addProductService.getProductCategories().subscribe(cats => this.productCategories = cats.data);
  }

  getSubCats(e) {
    this.addProductService.getSubProductCategories(e.target.value).subscribe(subCats => this.productSubCats = subCats.data);
  }

  getSpecifications(e) {
    if(e.target.value !== '') {
      this.addProductService.getSubProductSpecifications(e.target.value).subscribe(
        (specifications: any) => {
          this.productSpecifications = specifications.data;
          console.log(this.productSpecifications);
          
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
    }    
  }

  removeTabHandler(tab: any): void {
    this.customTabs.splice(this.customTabs.indexOf(tab), 1);
    console.log('Remove Tab handler');
  }

  addProduct() {
    this.isLoading = true;
    this.product.product_imgs = this.productImgs;
    this.product.product_variants = this.productVariations;
    this.product.customTabs = this.customTabs;
    this.product.product_specifications = this.productVariantFormat(this.productSpecifications);
    this.product.product_qty = 0;
    this.product.product_price = parseFloat(this.product.product_price);
    this.product.min_order_qty = parseInt(this.product.min_order_qty);
    console.log(this.product);
    this.addProductService.addProduct(this.product).subscribe(resProd => {
      console.log(resProd);
      this.isLoading = false;
    });
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
}
