/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {
  NbPasswordAuthStrategy,
  NbAuthModule,
  NbAuthJWTToken,
} from '@nebular/auth';
import {AuthGuard} from './services/auth-guard.service';
import {FilterPipe} from './pages/cashier/filter.pipe';
import {QuantityActionComponentComponent} from './pages/cashier/quantity-action-component.component';
import {DeleteActionComponent} from './pages/cashier/delete-action.component';
import {OrderActionComponent} from './pages/cashier/order-action.component';


@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://23.94.26.75/vat-api/api',
          login: {
            endpoint: '/account/check-login',
            method: 'post',
          },
          token: {
            class: NbAuthJWTToken,
            key: 'data.access_token',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 500,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
          redirect: {
            success: '/pages/',
            failure: null,
          },
        },
      },
    }),
    CoreModule.forRoot(),
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
