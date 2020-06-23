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
import { ContactUsComponent } from '../../../views/delinfo/contact-us/contact-us.component';


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
        component: RegisterComponent,
        data: { title: 'Register' }
      },

      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' }
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
        component: WishlistComponent,
        data: { title: 'Wishlist' }
      },
      {
        path: 'cart',
        component: CartComponent,
        data: { title: 'Cart' }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: { title: 'About' }
      },
      {
        path: 'our-corporate-values',
        component: CorporateValuesComponent,
        data: { title: 'Our Corporate Values' }
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        data: { title: 'Contact Us' }
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
    RegisterComponent, LoginComponent, ProductListComponent, SlidebarComponent, AboutComponent, WishlistComponent, CorporateValuesComponent, ContactUsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
