import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RecapComponent} from './recap/recap.component';
import {ProductComponent} from './product/product.component';
import {CategoryComponent} from './category/category.component';
import {OrderComponent} from './order/order.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'recap',
      component: RecapComponent,
    },
    {
      path: 'product',
      component: ProductComponent,
    },
    {
      path: 'category',
      component: CategoryComponent,
    }, {
      path: 'order',
      component: OrderComponent,
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
