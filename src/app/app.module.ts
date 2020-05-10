/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LogoutModule } from './auth/logout/logout.module';
import { LoginMoudle } from './auth/login/login.module';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

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
import {RoleProvider} from './services/role.provider';

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LogoutModule,
    LoginMoudle,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
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
          rememberMe: false,
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
    NbSecurityModule.forRoot({
      accessControl: {
        Cashier: {
          notification: 'Order',
          view: ['Cashier', 'Order History', 'Dashboard', 'Product', 'Profile', 'Notification'],
          create: 'Cashier',
          edit: 'Cashier',
        },
        Admin: {
          notification: '',
          view: ['Order History', 'Dashboard', 'Product', 'Profile', 'Category', 'Account', 'Model generator'],
          create: '*',
          edit: '*',
        }
      }
    }),
  ],
  providers: [AuthGuard, {
    provide: NbRoleProvider,
    useClass: RoleProvider,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
