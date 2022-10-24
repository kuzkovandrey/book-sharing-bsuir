import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-text, [appText]',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {}
