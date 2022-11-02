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
  TuiInputPasswordModule,
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
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { TextOverflowPipe } from './pipes/text-overflow.pipe';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';

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
    TuiInputPasswordModule,
    TuiTableModule,
    TuiLetModule,
  ],
  declarations: [
    AppHeaderComponent,
    TitleComponent,
    SubtitleComponent,
    TextComponent,
    LinkComponent,
    SearchBarComponent,
    SearchFilterComponent,
    TextOverflowPipe,
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
    TuiInputPasswordModule,
    SearchBarComponent,
    SearchFilterComponent,
    TextOverflowPipe,
    TuiTableModule,
    TuiLetModule,
  ],
})
export class SharedModule {}
