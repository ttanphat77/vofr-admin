import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashierComponent, UserFilterPipe } from './cashier/cashier.component';
import { FormatPriceComponent } from "./format-price/format-price.component";
import {
  NbActionsModule, NbAlertModule,
  NbButtonModule, NbRadioModule,
  NbCardModule, NbCheckboxModule, NbDialogModule,
  NbIconModule, NbUserModule,
  NbInputModule, NbTabsetModule,
  NbListModule, NbPopoverModule, NbSelectModule, NbSpinnerModule,
  NbThemeModule, NbTooltipModule,
} from '@nebular/theme';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FilterPipe } from "./filter.pipe";
import { QuantityActionComponentComponent } from "./quantity-action/quantity-action-component.component";
import { DeleteActionComponent } from "./delete-action/delete-action.component";
import { OrderActionComponent } from "./order-action/order-action.component";
import { MergeOrderComponent } from './merge-order/merge-order.component';
import { SizeComponent } from './size/size.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SizePickerComponent } from './cashier/size-picker/size-picker.component';


@NgModule({
  declarations: [
    UserFilterPipe,
    CashierComponent,
    FilterPipe,
    QuantityActionComponentComponent,
    DeleteActionComponent,
    OrderActionComponent,
    MergeOrderComponent,
    FormatPriceComponent,
    SizeComponent,
    SizePickerComponent],
  entryComponents: [
    QuantityActionComponentComponent,
    DeleteActionComponent,
    OrderActionComponent,
    MergeOrderComponent,
    FormatPriceComponent,
    SizeComponent,
    SizePickerComponent],
  imports: [
    NbRadioModule,
    NbUserModule,
    NgbModule,
    NbTabsetModule,
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
    NbCheckboxModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    FilterPipe
  ]
})
export class CashierModule {
}
