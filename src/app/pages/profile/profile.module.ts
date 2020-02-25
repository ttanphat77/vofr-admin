import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule } from "@angular/forms";
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbToastrModule,
} from '@nebular/theme';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
    NbToastrModule.forRoot(),
  ]
})
export class ProfileModule { }
