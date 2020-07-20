import { BrowserModule, Title, BrowserTransferStateModule, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestInterceptorService } from './common/utils/request.interceptor';

import { AlertModule } from './core/modules/alert/alert.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,

  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'deloffice-ltd' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    AngularFireModule.initializeApp(environment.firebase, 'deloffice-ltd'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],

  providers: [
    Title,
    Meta,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
