import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbAlertModule, NbButtonModule, NbInputModule, NbCheckboxModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NbAuthModule,
        RouterModule,
    ],
    declarations: [
        LoginComponent,
    ]
})

export class LoginMoudle { }
