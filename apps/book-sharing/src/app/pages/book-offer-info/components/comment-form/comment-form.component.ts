import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-form, [appCommentForm]',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  readonly fieldSize = 'm';

  @Output() submitForm = new EventEmitter<string>();

  commentControl = new FormControl('', [Validators.required]);

  constructor() {}

  ngOnInit(): void {}

  onClickButton() {
    this.submitForm.emit(this.commentControl.value);
    this.commentControl.reset();
    this.commentControl.markAsUntouched();
  }
}
