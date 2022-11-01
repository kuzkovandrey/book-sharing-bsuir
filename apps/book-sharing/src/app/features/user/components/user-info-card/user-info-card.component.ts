import { UserModel } from '@book-sharing/api-interfaces';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule],
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.scss'],
})
export class UserInfoCardComponent implements OnInit {
  @Input() user: UserModel;

  @Output() onClickChangeButton = new EventEmitter<UserModel>();

  @Output() logoutClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClickChange() {
    this.onClickChangeButton.emit(this.user);
  }

  onClickLogoutButton() {
    this.logoutClick.emit();
  }
}
