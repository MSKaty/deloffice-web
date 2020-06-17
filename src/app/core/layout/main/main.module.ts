import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { HomeComponent } from '../../../views/home/home.component';

import { SearchResultsComponent } from '../../../views/search-results/search-results.component';
import { SingleProductComponent } from 'src/app/single-product/single-product.component';
import { RegisterComponent } from 'src/app/common/register/register.component';
import { LoginComponent } from 'src/app/common/login/login.component';
import { ProductListComponent } from '../../../product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [

      {
        path: 'search-results',
        component: SearchResultsComponent,
      },

      {
        path: 'single-product',
        component: SingleProductComponent
      },

      {
        path: 'register',
        component: RegisterComponent
      },

      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'category',
        component: ProductListComponent
      },
      {
        path: 'slidebar',
        component: SlidebarComponent
      }

    ]
  }
];

@NgModule({
  declarations: [MainComponent, HeaderComponent, FooterComponent, HomeComponent, SearchResultsComponent, SingleProductComponent, RegisterComponent, LoginComponent, ProductListComponent, SlidebarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
