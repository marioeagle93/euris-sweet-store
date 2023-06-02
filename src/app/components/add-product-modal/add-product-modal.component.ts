import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent {
  private _visible: boolean = false;

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
}
