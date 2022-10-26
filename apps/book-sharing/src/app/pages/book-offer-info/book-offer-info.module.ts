import { SwiperModule } from 'swiper/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookOfferInfoComponent } from './book-offer-info.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { BookOfferInfoFacade } from './services/book-offer-info.facade';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { BookDescriptionComponent } from './components/book-description/book-description.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';

const routes: Routes = [
  {
    path: ':id',
    component: BookOfferInfoComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    IvyCarouselModule,
  ],
  exports: [RouterModule],
  declarations: [
    BookOfferInfoComponent,
    CommentCardComponent,
    CommentFormComponent,
    BookDescriptionComponent,
    OfferDetailsComponent,
  ],
  providers: [BookOfferInfoFacade],
})
export class BookOfferInfoModule {}
