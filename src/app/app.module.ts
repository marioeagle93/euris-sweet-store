import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [AppComponent, DashboardComponent, SpinnerComponent, AddProductModalComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    ToastModule
  ],
  exports: [SpinnerComponent],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
