import { Component, OnInit } from '@angular/core';
import { DefaultService } from 'src/app/api/api/default.service';
import { STORE_ID } from '../../constants/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private defaultService: DefaultService) {}

  ngOnInit(): void {
    // TODO
    // this.defaultService.storesIdStoreGet(STORE_ID).subscribe((res) => {
    //   this.storeName = res.data.name;
    // });
  }
}
