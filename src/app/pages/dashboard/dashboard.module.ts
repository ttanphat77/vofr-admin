import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbIconModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { QuickAccessCardComponent } from './quick-access-card/quick-access-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    NbCardModule,
    NbIconModule,
    ThemeModule,
    RouterModule,
  ],
  declarations: [
    DashboardComponent,
    QuickAccessCardComponent,
  ],
})
export class DashboardModule { }
