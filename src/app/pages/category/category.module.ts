import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbDialogModule, NbButtonModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CategoryComponent } from './category.component';


@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    NbDialogModule.forRoot(),
  ]
})
export class CategoryModule { }

