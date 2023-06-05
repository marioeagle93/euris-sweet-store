import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DefaultService } from 'src/app/api/api/default.service';
import { STORE_ID } from '../../constants/constants';
import { WrappedProduct } from 'src/app/api/model/wrappedProduct';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Input() showAsGrid: boolean = false;
  @Output() productListChange = new EventEmitter<Array<WrappedProduct>>();

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
  private _subscriptions = new Subscription();

  constructor(private defaultService: DefaultService, private messageService: MessageService, private globalService: GlobalService) {
    this._subscriptions.add(
      this.globalService.reloadProductListSubject.subscribe(() => {
        this.loadProducts();
      })
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  loadProducts() {
    this.loading = true;
    this.defaultService.storesIdStoreProductsGet(STORE_ID).subscribe((res: Array<WrappedProduct>) => {
      this.loading = false;
      this.productList = res;
      this.productListChange.emit(res);
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
      this.messageService.add({
        severity: 'success',
        life: 5000,
        summary: 'Prodotto eliminato',
        detail: 'Il prodotto "' + this.currentProduct.data.title + '" è stato eliminato correttamente.'
      });
      this.loading = false;
      this.loadProducts();
    });
  }
}
