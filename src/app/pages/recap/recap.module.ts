import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbProgressBarModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { RecapComponent } from './recap.component';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbProgressBarModule,
    FileUploadModule,
  ],
  declarations: [
    RecapComponent,
  ],
})
export class RecapModule { }
