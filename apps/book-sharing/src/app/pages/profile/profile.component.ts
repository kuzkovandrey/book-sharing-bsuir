import { AppRoutes } from '@core/values';
import { Component } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  readonly profileMenuRoutes = [
    {
      path: AppRoutes.USER_INFO,
      name: 'Аккаунт',
    },
    {
      path: AppRoutes.BOOK_COLLECTIONS,
      name: 'Мои закладки',
    },
    {
      path: AppRoutes.CREATE,
      name: 'Добавить книгу',
    },
    {
      path: AppRoutes.EXCHANGES,
      name: 'Мой обмен',
    },
    {
      path: AppRoutes.STATS,
      name: 'Общая статистика',
    },
  ] as const;
}
