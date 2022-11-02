import { BookOfferCardComponent } from '@features/book-offers/components/book-offer-card/book-offer-card.component';
import { AppRoutes } from '@core/values';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { BookCollectionsComponent } from './book-collections/book-collections.component';
import { CreateBookOfferComponent } from './create-book-offer/create-book-offer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeUserInfoComponent } from './change-user-info/change-user-info.component';
import { UserFormComponent } from '@features/user/components';
import { UserInfoCardComponent } from '@features/user/components/user-info-card/user-info-card.component';
import { UserInfoFacade } from './services/user-info.facade';
import { ExchangesComponent } from './exchanges/exchanges.component';
import { ExchangeCardComponent } from '@features/exchanges/components/exchange-card/exchange-card.component';
import { UserExchangesFacade } from './services/user-exchanges.facade';
import { StatisticsComponent } from './statistics/statistics.component';
import { ExchangeStatusToTextPipe } from '@features/exchanges/pipes/exchange-status-to-text.pipe';

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
      {
        path: AppRoutes.CREATE,
        component: CreateBookOfferComponent,
      },
      {
        path: AppRoutes.CHANGE_INFO,
        component: ChangeUserInfoComponent,
      },
      {
        path: AppRoutes.EXCHANGES,
        component: ExchangesComponent,
      },
      {
        path: AppRoutes.STATS,
        component: StatisticsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    BookOfferCardComponent,
    UserFormComponent,
    UserInfoCardComponent,
    ExchangeCardComponent,
    ExchangeStatusToTextPipe,
  ],
  exports: [RouterModule],
  declarations: [
    ProfileComponent,
    UserInfoComponent,
    BookCollectionsComponent,
    CreateBookOfferComponent,
    ChangeUserInfoComponent,
    ExchangesComponent,
    StatisticsComponent,
  ],
  providers: [UserInfoFacade, UserExchangesFacade],
})
export class ProfileModule {}
