import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DefaultService } from 'src/app/api/api/default.service';
import { Product } from 'src/app/api/model/product';
import { STORE_ID } from 'src/app/constants/constants';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit {
  private _visible: boolean = false;
  loading: boolean = false;
  categoriesList: string[] = [];
  newProduct: Product = {
    title: '',
    category: '',
    price: 0,
    employee: '',
    description: ''
  };

  @Input() employees: Array<string> = [];

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
    if (confirm) {
      this.addNewProduct();
    }
  }

  constructor(private defaultService: DefaultService, private messageService: MessageService, private globalService: GlobalService) {}

  ngOnInit(): void {
    this.loading = true;
    this.defaultService.storesIdStoreStatsCategoriesGet(STORE_ID).subscribe((res) => {
      this.loading = false;
      this.categoriesList = res.map((el) => el.category);
    });
  }

  addNewProduct(): void {
    this.loading = true;
    this.defaultService.storesIdStoreProductsPost(this.newProduct, STORE_ID).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          life: 5000,
          summary: 'Prodotto Creato',
          detail: 'Il prodotto "' + this.newProduct.title + '" è stato aggiunto correttamente.'
        });
        this.handleAfterRequestResponse();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          life: 5000,
          summary: 'Errore in fase di creazione del prodotto "' + this.newProduct.title + '".'
        });
        this.handleAfterRequestResponse();
      }
    });
  }

  handleAfterRequestResponse() {
    this.loading = false;
    this.globalService.reloadProductList();
    this.newProduct = {
      title: '',
      category: '',
      price: 0,
      employee: '',
      description: ''
    };
  }
}
