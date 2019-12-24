import {NgModule} from '@angular/core';
import {AccountComponent} from "./account.component";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbListModule, NbPopoverModule, NbSelectModule, NbSpinnerModule,
  NbThemeModule, NbTooltipModule
} from "@nebular/theme";
import {FileUploadModule} from "ng2-file-upload";
import {FormsModule} from "@angular/forms";
import {ThemeModule} from "../../@theme/theme.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {ActiveAccountButtonComponent} from './active-account-button.component';
import {ActionAccountComponent} from "./action.account.component";
import {RoleSelectComponent} from "./role.select.component";


@NgModule({
  declarations: [AccountComponent, ActiveAccountButtonComponent, ActionAccountComponent, RoleSelectComponent],
  entryComponents: [ActiveAccountButtonComponent, ActionAccountComponent, RoleSelectComponent],
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
  ]
})
export class AccountModule {
}