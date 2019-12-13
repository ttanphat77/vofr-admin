import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { RecapModule } from './recap/recap.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import {OrderModule} from './order/order.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    RecapModule,
    ProductModule,
    CategoryModule,
    OrderModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
