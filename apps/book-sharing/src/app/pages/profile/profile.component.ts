import { AppRoutes } from '@core/values';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  readonly profileMenuRoutes = [
    {
      path: AppRoutes.USER_INFO,
      name: 'Аккаунт',
    },
    {
      path: AppRoutes.BOOK_COLLECTIONS,
      name: 'Мои закладки',
    },
  ] as const;

  constructor() {}

  ngOnInit() {}
}
