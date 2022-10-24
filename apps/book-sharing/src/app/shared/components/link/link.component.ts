import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-link, [appLink]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {}
