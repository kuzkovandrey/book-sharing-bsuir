import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-subtitle, [appSubtitle]',
  templateUrl: './subtitle.component.html',
  styleUrls: ['./subtitle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtitleComponent {}
