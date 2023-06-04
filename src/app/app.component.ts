import { Component, OnInit } from '@angular/core';
import { DefaultService } from './api/api/default.service';
import { STORE_ID } from './constants/constants';
import { WrappedProduct } from './api/model/wrappedProduct';

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

  // Chart Values
  chartData: any;
  chartOptions: any;

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

  updateProductCategoryRatio(productList: Array<WrappedProduct>) {
    const categoryCountMap: Map<string, number> = new Map();

    productList.forEach((product) => {
      const category = product?.data?.category;
      if (category) {
        if (categoryCountMap.get(category)) {
          // Gestisco il caso in cui la categoria è gia presente nella mappa aumentando la count
          const previousCount = categoryCountMap.get(category);
          categoryCountMap.set(category, previousCount ? previousCount + 1 : 1);
        } else {
          // Gestisco il caso in cui la categoria NON è presente nella mappa
          categoryCountMap.set(category, 1);
        }
      }
    });

    this.chartData = {
      datasets: [
        {
          data: [...categoryCountMap.values()],
          backgroundColor: ['#BA274A', '#48E5C2', '#2191FB', '#F3D3BD', '#522A27'],
          label: 'Prodotti per Categoria'
        }
      ],
      labels: [...categoryCountMap.keys()]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: 'darkgray'
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: 'gray'
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }
}
