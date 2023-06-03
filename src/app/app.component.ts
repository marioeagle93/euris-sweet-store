import { Component, OnInit } from '@angular/core';
import { DefaultService } from './api/api/default.service';
import { STORE_ID } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  storeName: string = '';
  loading: boolean = true;
  showAddProductDialog: boolean = false;
  showChartDialog: boolean = false;
  employees: Array<string> = [];
  switchViewLabel: string = '';
  showChartLabel: string = '';
  addProductLabel: string = '';

  constructor(private defaultService: DefaultService) {}

  ngOnInit(): void {
    this.defaultService.storesIdStoreGet(STORE_ID).subscribe((res) => {
      if (res?.name) {
        this.storeName = res.name;
      }
      if (res?.employees) {
        this.employees = res.employees;
      }
      this.loading = false;
    });
  }

  openAddProductDialog() {
    this.showAddProductDialog = true;
  }

  openChartDialog() {
    this.showChartDialog = true;
  }

  switchView() {
    // TODO
  }
}
