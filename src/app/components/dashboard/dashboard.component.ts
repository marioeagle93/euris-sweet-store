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
  constructor(private defaultService: DefaultService) {}

  productList: Array<WrappedProduct> = [];

  ngOnInit(): void {
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
}
