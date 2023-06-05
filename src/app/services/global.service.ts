import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  reloadProductListSubject: Subject<void> = new Subject<void>();

  reloadProductList() {
    this.reloadProductListSubject.next();
  }
}
