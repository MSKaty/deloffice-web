import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { JobOpportunitiesComponent } from '../../../views/delinfo/job-opportunities/job-opportunities.component';
import { AntiBriberyPolicyComponent } from '../../../views/delinfo/anti-bribery-policy/anti-bribery-policy.component';
import { FAQComponent } from '../../../views/delinfo/faq/faq.component';
import { DeliveryPolicyComponent } from '../../../views/delinfo/delivery-policy/delivery-policy.component';
import { MyaccountsComponent } from '../../../views/myaccounts/myaccounts.component';


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
        path: 'category',
        children: [
          {
            path: ':id',
            component: ProductListComponent
          }
        ]

      },

      {
        path: 'search',
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
      {
        path: 'job-opportunities',
        component: JobOpportunitiesComponent,
        data: { title: 'Job Opportunities' }
      },
      {
        path: 'anti-bribery-policy',
        component: AntiBriberyPolicyComponent,
        data: { title: 'Anti-Bribery Policy' }
      },
      {
        path: 'faq',
        component: FAQComponent,
        data: { title: 'FAQ' }
      },
      {
        path: 'delivery-policy',
        component: DeliveryPolicyComponent,
        data: { title: 'Delivery Policy' }
      },
      {
        path: 'account',
        component: MyaccountsComponent,
        data: { title: 'My Account' }
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
    RegisterComponent, LoginComponent, ProductListComponent, SlidebarComponent, AboutComponent, WishlistComponent, CorporateValuesComponent,
    ContactUsComponent, JobOpportunitiesComponent, AntiBriberyPolicyComponent, FAQComponent, DeliveryPolicyComponent, MyaccountsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
