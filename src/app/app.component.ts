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

  constructor(private defaultService: DefaultService) {}

  ngOnInit(): void {
    this.defaultService.storesIdStoreGet(STORE_ID).subscribe((res) => {
      if (res?.name) {
        this.storeName = res.name;
      }
      this.loading = false;
    });
  }

  openAddProductDialog() {
    this.showAddProductDialog = true;
  }
}
