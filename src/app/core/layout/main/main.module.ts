import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { HomeComponent } from '../../../views/home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { SearchResultsComponent } from '../../../views/search-results/search-results.component';
import { SingleProductComponent } from 'src/app/views/single-product/single-product.component';
import { RegisterComponent } from 'src/app/views/register/register.component';
import { LoginComponent } from 'src/app/views/login/login.component';
import { ProductListComponent } from '../../../views/product-list/product-list.component';
import { CartComponent } from '../main/cart/cart.component';
import { AboutComponent } from '../../../views/delinfo/about/about.component';
import { WishlistComponent } from '../main/wishlist/wishlist.component';
import { CorporateValuesComponent } from 'src/app/views/delinfo/corporate-values/corporate-values.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { title: 'Home' }
      },
      {
        path: 'product',
        children: [
          {
            path: ':id',
            component: SingleProductComponent
          }
        ]
      },
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
        path: 'category',
        component: ProductListComponent
      },
      {
        path: 'slidebar',
        component: SlidebarComponent
      },

      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'our-corporate-values',
        component: CorporateValuesComponent
      },


    ]
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [MainComponent, HeaderComponent, CartComponent, FooterComponent, HomeComponent, SearchResultsComponent, SingleProductComponent,
    RegisterComponent, LoginComponent, ProductListComponent, SlidebarComponent, AboutComponent, WishlistComponent, CorporateValuesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
