import { AppRoutes } from '@core/values';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '@core/services/alert.service';
import { LoadingService } from '@core/services/loading.service';
import { BookOfferModel } from '@book-sharing/api-interfaces';
import { UserInfoFacade } from './../services/user-info.facade';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModelWithCollectionState } from '@features/collections/services/collection.service';

@Component({
  selector: 'app-book-collections',
  templateUrl: './book-collections.component.html',
  styleUrls: ['./book-collections.component.scss'],
})
export class BookCollectionsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  collectionList: ModelWithCollectionState<BookOfferModel>[];

  constructor(
    private userInfoFacade: UserInfoFacade,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.userInfoFacade.getBookOffersFromCollection().subscribe({
        next: (list) => {
          this.collectionList = list;
          this.loadingService.setLoading(false);
        },
        error: ({ status }: HttpErrorResponse) => {
          this.alertService.showError(`Ошибка получения данных: ${status}`);
          this.loadingService.setLoading(false);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleCollectionState(offer: ModelWithCollectionState<BookOfferModel>) {
    this.userInfoFacade.toggleCollectionState(offer);
  }

  navigateToOfferDetails(id: number) {
    this.router.navigate([AppRoutes.BOOK_OFFER, id]);
  }
}
