import { TuiFilterPipeModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiSelectModule,
  TuiInputModule,
  TuiTextAreaModule,
  TuiToggleModule,
  TuiStringifyContentPipeModule,
  TuiTagModule,
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './components';
import { TitleComponent } from './components/title/title.component';
import { SubtitleComponent } from './components/subtitle/subtitle.component';
import { TextComponent } from './components/text/text.component';
import { LinkComponent } from './components/link/link.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiTextAreaModule,
    TuiToggleModule,
    TuiStringifyContentPipeModule,
    TuiFilterPipeModule,
    TuiTagModule,
  ],
  declarations: [
    AppHeaderComponent,
    TitleComponent,
    SubtitleComponent,
    TextComponent,
    LinkComponent,
  ],
  exports: [
    AppHeaderComponent,
    TitleComponent,
    SubtitleComponent,
    TextComponent,
    LinkComponent,
    RouterModule,
    ReactiveFormsModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiTextAreaModule,
    TuiToggleModule,
    TuiStringifyContentPipeModule,
    TuiFilterPipeModule,
    TuiTagModule,
  ],
})
export class SharedModule {}
