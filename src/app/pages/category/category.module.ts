import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CategoryComponent } from './category.component';
import { SubCategoryRenderComponent } from './subCategory.render.component';
import { ActionRenderComponent } from './action.render.component';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbDialogModule,
  NbButtonModule,
  NbActionsModule,
  NbPopoverModule,
} from '@nebular/theme';

@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryRenderComponent,
    ActionRenderComponent,

  ],
  entryComponents: [
    SubCategoryRenderComponent,
    ActionRenderComponent
  ],
  imports: [
    FormsModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbListModule,
    NbPopoverModule,
    NbActionsModule,
    ThemeModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    FileUploadModule,
    NbDialogModule.forRoot(),
  ],
})
export class CategoryModule { }

