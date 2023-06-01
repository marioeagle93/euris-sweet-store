import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, DashboardComponent, SpinnerComponent],
  imports: [AppRoutingModule, BrowserModule, CommonModule, HttpClientModule, ProgressSpinnerModule],
  exports: [SpinnerComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
