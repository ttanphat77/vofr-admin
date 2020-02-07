import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbSpinnerModule,
  NbProgressBarModule,
  NbListModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { RecapComponent } from './recap.component';
import { FileUploadModule } from 'ng2-file-upload';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { ScenePipe } from '../pipe/scene.pipe';
@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    NbProgressBarModule,
    Ng2SmartTableModule,
    NbListModule,
    FileUploadModule,
    FormsModule,
  ],
  declarations: [
    RecapComponent,
    ScenePipe,
  ],
})
export class RecapModule { }
