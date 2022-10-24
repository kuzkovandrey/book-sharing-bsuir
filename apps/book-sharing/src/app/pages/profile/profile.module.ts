import { AppRoutes } from '@core/values';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { BookCollectionsComponent } from './book-collections/book-collections.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoutes.USER_INFO,
      },
      {
        path: AppRoutes.USER_INFO,
        component: UserInfoComponent,
      },
      {
        path: AppRoutes.BOOK_COLLECTIONS,
        component: BookCollectionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TuiAvatarModule,
    TuiButtonModule,
  ],
  exports: [RouterModule],
  declarations: [ProfileComponent, UserInfoComponent, BookCollectionsComponent],
})
export class ProfileModule {}
