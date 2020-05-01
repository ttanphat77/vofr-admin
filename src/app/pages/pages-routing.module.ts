import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecapComponent } from './recap/recap.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';
import { CashierComponent } from './cashier/cashier/cashier.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'recap',
      component: RecapComponent,
    }, {
      path: 'cashier',
      component: CashierComponent,
    },
    {
      path: 'product',
      component: ProductComponent,
    },
    {
      path: 'category',
      component: CategoryComponent,
    },
    {
      path: 'order',
      component: OrderComponent,
    },
    {
      path: 'account',
      component: AccountComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
