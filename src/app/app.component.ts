import { Component } from '@angular/core';
import { DefaultService } from './api/api/default.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'euris-sweet-store';
  idStore = 'ijpxNJLM732vm8AeajMR';

  constructor(private defaultService: DefaultService) {}

  ngOnInit(): void {
    this.defaultService.storesIdStoreGet(this.idStore).subscribe((res) => {
      console.log(res);
    });
  }
}
