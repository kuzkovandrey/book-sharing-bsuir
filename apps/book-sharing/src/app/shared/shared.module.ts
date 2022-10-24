import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './components';
import { TitleComponent } from './components/title/title.component';
import { SubtitleComponent } from './components/subtitle/subtitle.component';
import { TextComponent } from './components/text/text.component';
import { LinkComponent } from './components/link/link.component';

@NgModule({
  imports: [CommonModule, RouterModule],
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
  ],
})
export class SharedModule {}
