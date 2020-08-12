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
import { LightboxModule } from 'ngx-lightbox';

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
import { UpdatePassComponent } from '../../../views/update-pass/update-pass.component';
import { AuthGuard } from 'src/app/common/services/auth.guard';
import { ReturnsPolicyComponent } from '../../../views/delinfo/returns-policy/returns-policy.component';
import { MembershipPolicyComponent } from '../../../views/delinfo/membership-policy/membership-policy.component';
import { TermsnconditionsComponent } from '../../../views/delinfo/termsnconditions/termsnconditions.component';
import { PrivacynsecurityComponent } from '../../../views/delinfo/privacynsecurity/privacynsecurity.component';
import { UsefulListComponent } from 'src/app/views/useful-list/useful-list.component';
import { Error404Component } from '../../../views/error404/error404.component';
import { HeaderScrollDirective } from './header/header-scroll.directive';
import { PrintingComponent } from '../../../views/printing/printing.component';
import { CataloguesComponent } from '../../../views/catalogues/catalogues.component';
import { SlideCarouselComponent } from './slide-carousel/slide-carousel.component';




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
        path: 'promo',
        children: [
            {
                path: ':id',
                component: UsefulListComponent
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
        data: { title: 'Wishlist' },
        canActivate: [AuthGuard]
      },
      {
        path: 'cart',
        component: CartComponent,
        data: { title: 'Cart' },
        canActivate: [AuthGuard]
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
        path: 'Membership-Policy',
        component: MembershipPolicyComponent,
        data: { title: 'MemberShip Policy' }
      },
      {
        path: 'Terms-and-conditions',
        component: TermsnconditionsComponent,
        data: { title: 'Terms & Conditions' }
      },
      {
        path: 'Privacy-and-Security',
        component: PrivacynsecurityComponent,
        data: { title: 'Privacy & Security' }
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
        path: 'returns-policy',
        component: ReturnsPolicyComponent,
        data: { title: 'Returns Policy' }
      },
      {
        path: 'account',
        component: MyaccountsComponent,
        data: { title: 'My Account' },
        canActivate: [AuthGuard]
      },
      {
        path: 'pass-update',
        component: UpdatePassComponent,
        data: { title: 'Update Password' },
        canActivate: [AuthGuard]
      },
      {
        path: 'error-404',
        component: Error404Component,
        data: { title: 'Error 404' }
      },
      {
        path: 'printing-services',
        component: PrintingComponent,
        data: { title: 'Printing Services' }
      },
      {
        path: 'catalogues',
        component: CataloguesComponent,
        data: { title: 'Catalogues' }
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
  declarations: [MainComponent, HeaderComponent, HeaderScrollDirective, CartComponent, FooterComponent, HomeComponent, SearchResultsComponent, SingleProductComponent,
    RegisterComponent, LoginComponent, ProductListComponent, SlidebarComponent, AboutComponent, WishlistComponent, CorporateValuesComponent,
    ContactUsComponent, JobOpportunitiesComponent, AntiBriberyPolicyComponent, FAQComponent, DeliveryPolicyComponent, MyaccountsComponent,
    UpdatePassComponent, ReturnsPolicyComponent, MembershipPolicyComponent, TermsnconditionsComponent, PrivacynsecurityComponent, UsefulListComponent, Error404Component, PrintingComponent, CataloguesComponent, SlideCarouselComponent],

  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    LightboxModule
  ]
})
export class MainModule { }
