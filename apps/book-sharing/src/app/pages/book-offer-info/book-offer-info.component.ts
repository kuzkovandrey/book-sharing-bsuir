import { AppRoutes } from './../../core/values/app-routes.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '@core/services/alert.service';
import { LoadingService } from '@core/services/loading.service';
import { BookOfferInfoFacade } from './services/book-offer-info.facade';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BookOfferModel, CommentModel } from '@book-sharing/api-interfaces';

@Component({
  selector: 'app-book-offer-info',
  templateUrl: './book-offer-info.component.html',
  styleUrls: ['./book-offer-info.component.scss'],
})
export class BookOfferInfoComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  readonly offerId: number;

  bookOffer: BookOfferModel;

  images: { path: string }[];

  commentList: CommentModel[] = [];

  get bookAuthors(): string[] {
    return this.bookOffer.book.authors.map(
      ({ firstName, lastName }) => `${firstName} ${lastName};`
    );
  }

  readonly hasCommentForm$: Observable<boolean>;

  constructor(
    route: ActivatedRoute,
    private bookOfferInfoFacade: BookOfferInfoFacade,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.offerId = route.snapshot.params['id'];
    this.hasCommentForm$ = this.bookOfferInfoFacade.hasCommentForm$();
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.bookOfferInfoFacade.getOfferById(this.offerId).subscribe({
        next: (bookOffer) => {
          this.bookOffer = bookOffer;
          this.images = bookOffer.book.pictures.map(({ url: path }) => ({
            path,
          }));

          this.commentList = this.bookOffer.comments ?? [];

          this.loadingService.setLoading(false);
        },
        error: ({ status }: HttpErrorResponse) => {
          this.loadingService.setLoading(false);
          this.alertService.showError(`Ошибка получения данных ${status}`);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addComment(text: string) {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.bookOfferInfoFacade.addComment(this.offerId, text).subscribe({
        next: (comment) => {
          this.commentList.push(comment);
          this.loadingService.setLoading(false);
        },
        error: ({ status }: HttpErrorResponse) => {
          this.alertService.showError(
            `Ошибка добавления комментария ${status}`
          );
          this.loadingService.setLoading(false);
        },
      })
    );
  }

  navigateToAuth() {
    this.router.navigate([AppRoutes.AUTH]);
  }
}
