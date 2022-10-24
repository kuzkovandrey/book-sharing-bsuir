import { BookOfferCardComponent } from './../../features/book-offers/components/book-offer-card/book-offer-card.component';
import { TuiFilterPipeModule } from '@taiga-ui/cdk';
import { AppRoutes } from '@core/values';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { BookCollectionsComponent } from './book-collections/book-collections.component';
import { CreateBookOfferComponent } from './create-book-offer/create-book-offer.component';
import {
  TuiDialogContext,
  TuiDataListModule,
  TuiTextfieldControllerModule,
  TuiButtonModule,
} from '@taiga-ui/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  tuiItemsHandlersProvider,
  TuiInputModule,
  TuiTextAreaModule,
  TuiToggleModule,
  TuiMultiSelectModule,
  TuiSelectModule,
  TuiStringifyContentPipeModule,
  TuiFilterModule,
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  exports: [RouterModule],
  declarations: [
    ProfileComponent,
    UserInfoComponent,
    BookCollectionsComponent,
    CreateBookOfferComponent,
  ],
})
export class ProfileModule {}
