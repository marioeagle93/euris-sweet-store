import { Component, OnInit } from '@angular/core';
import { DefaultService } from './api/api/default.service';
import { STORE_ID } from './src/app/constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  storeName: string = '';

  constructor(private defaultService: DefaultService) {}

  ngOnInit(): void {
    this.defaultService.storesIdStoreGet(STORE_ID).subscribe((res) => {
      if (res?.name) {
        // This is actually a bug I had to fix from the API
        this.storeName = res.name;
      }
    });
  }
}
