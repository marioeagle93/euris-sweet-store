import { Component, OnInit } from '@angular/core';
import { DefaultService } from 'src/app/api/api/default.service';
import { STORE_ID } from '../../constants/constants';
import { WrappedProduct } from 'src/app/api/model/wrappedProduct';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  productList: Array<WrappedProduct> = [];
  currentProduct: WrappedProduct = {
    id: '',
    data: {
      title: '',
      category: '',
      price: 0,
      employee: ''
    }
  };
  showDeleteProductDialog: boolean = false;
  showProductReviewsDialog: boolean = false;
  loading: boolean = false;

  constructor(private defaultService: DefaultService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.defaultService.storesIdStoreProductsGet(STORE_ID).subscribe((res: Array<WrappedProduct>) => {
      this.productList = res;
    });
  }

  isCurrencyCorrectlyFormatted(price: any): boolean {
    if (typeof price === 'number') {
      if (price >= 0) {
        return true;
      }
    } else if (typeof price === 'string' && typeof parseInt(price) === 'number' && parseInt(price) > 0) {
      return true;
    }
    return false;
  }

  handleDeleteProductClick(product: WrappedProduct) {
    this.currentProduct = product;
    this.showDeleteProductDialog = true;
  }

  handleShowProductReviewsClick(product: WrappedProduct) {
    this.currentProduct = product;
    this.showProductReviewsDialog = true;
  }

  deleteProduct() {
    this.loading = true;
    this.showDeleteProductDialog = false;
    this.defaultService.storesIdStoreProductsIdProductDelete(STORE_ID, this.currentProduct.id).subscribe((res) => {
      // TODO Aggiungere messaggio popup esito positivo
      this.loading = false;
      this.loadProducts();
    });
  }
}
