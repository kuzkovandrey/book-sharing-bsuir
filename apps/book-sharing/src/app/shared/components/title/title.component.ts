import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-title, [appTitle]',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {}
