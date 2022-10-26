import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommentModel } from '@book-sharing/api-interfaces';

@Component({
  selector: 'app-comment-card, [appCommentCard]',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentCardComponent {
  @Input() comment: CommentModel;
}
