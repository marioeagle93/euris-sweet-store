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
}
