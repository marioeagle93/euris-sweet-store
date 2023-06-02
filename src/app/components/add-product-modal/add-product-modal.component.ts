import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DefaultService } from 'src/app/api/api/default.service';
import { Product } from 'src/app/api/model/product';
import { STORE_ID } from 'src/app/constants/constants';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit {
  private _visible: boolean = false;
  loading: boolean = true;
  categoriesList: string[] = [];
  newProduct: Product = {
    title: '',
    category: '',
    price: 0,
    employee: '',
    description: ''
  };

  @Input()
  set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(this.visible);
  }

  get visible(): boolean {
    return this._visible;
  }

  @Output() visibleChange = new EventEmitter<boolean>();

  public onClick(confirm: boolean): void {
    this.visible = false;
  }

  constructor(private defaultService: DefaultService) {}

  ngOnInit(): void {
    this.defaultService.storesIdStoreStatsCategoriesGet(STORE_ID).subscribe((res) => {
      // TODO
      this.loading = false;
      this.categoriesList = res.map((el) => el.category);
    });
  }

  addNewProduct(): void {
    this.defaultService.storesIdStoreProductsPost(this.newProduct, STORE_ID).subscribe((res) => {
      // TODO
    });
  }
}
