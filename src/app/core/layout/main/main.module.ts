import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from '../../../views/home/home.component';

import { SearchResultsComponent } from '../../../views/search-results/search-results.component';
import { SingleProductComponent } from 'src/app/views/single-product/single-product.component';
import { RegisterComponent } from 'src/app/common/register/register.component';
import { LoginComponent } from 'src/app/common/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      // {
      //   path:'',
      //   component:HeaderComponent,
      // },
      // {
      //   path:'',
      //   component:HomeComponent,
      // },

      // {
      //   path:'',
      //   component:SearchResultsComponent,
      // },

      // {
      //   path:'',
      //   component:SingleProductComponent
      // },

      // {
      //   path:'',
      //   component:FooterComponent
      // },

      {
        path:'register',
        component:RegisterComponent
      },

      // {
      //   path:'',
      //   component:LoginComponent
      // }

    ]
  }
];

@NgModule({
  declarations: [MainComponent, HeaderComponent, FooterComponent, HomeComponent, SearchResultsComponent, SingleProductComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
