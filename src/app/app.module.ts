import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { CurrencyPipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
