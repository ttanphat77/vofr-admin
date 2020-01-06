import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CashierComponent} from './cashier.component';
import {
  NbActionsModule, NbAlertModule,
  NbButtonModule,
  NbCardModule, NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbListModule, NbPopoverModule, NbSelectModule, NbSpinnerModule,
  NbThemeModule, NbTooltipModule,
} from '@nebular/theme';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {AppModule} from "../../app.module";
import {FilterPipe} from "./filter.pipe";
import {DescriptionRenderComponent} from "../product/description.render.component";
import {QuantityActionComponentComponent} from "./quantity-action-component.component";
import {DeleteActionComponent} from "./delete-action.component";
import {OrderActionComponent} from "./order-action.component";


@NgModule({
  declarations: [CashierComponent, FilterPipe, QuantityActionComponentComponent, DeleteActionComponent, OrderActionComponent],
  entryComponents: [QuantityActionComponentComponent, DeleteActionComponent, OrderActionComponent],
  imports: [
    CommonModule,
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
    NbAlertModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    FilterPipe
  ]
})
export class CashierModule {
}
