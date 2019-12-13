import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ProductComponent } from './product.component';
import { ActiveButtonRenderComponent } from './activeButton.render.component';
import { ActionRenderComponent } from './action.render.component';
import { FileUploadModule } from 'ng2-file-upload';
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbDialogModule,
  NbButtonModule,
  NbListModule,
  NbActionsModule,
  NbPopoverModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbSelectModule,
  NbThemeModule,
} from '@nebular/theme';
import { DescriptionRenderComponent } from './description.render.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductComponent,
    ActiveButtonRenderComponent,
    ActionRenderComponent,
    DescriptionRenderComponent,
  ],
  entryComponents: [
    ActiveButtonRenderComponent,
    ActionRenderComponent,
    DescriptionRenderComponent,
  ],
  imports: [
    NbCardModule,
    FileUploadModule,
    FormsModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    ThemeModule,
    NbThemeModule,
    NbListModule,
    NbActionsModule,
    NbPopoverModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    NbTooltipModule,
    NbSpinnerModule,
    NbSelectModule,
    NbDialogModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductModule { }

