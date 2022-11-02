import { ModalDialogService } from '@core/services/modal-dialog.service';
import { ModelWithCollectionState } from '@features/collections/services/collection.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '@core/services/alert.service';
import { LoadingService } from '@core/services/loading.service';
import { MainFacade } from './services/main.facade';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  BookOfferModel,
  BookOfferSearchParams,
  UserModel,
} from '@book-sharing/api-interfaces';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/values';
import {
  CreateExchangeInput,
  CreateExchangeModalComponent,
  CreateExchangeOutput,
} from '@features/exchanges/components/create-exchange-modal/create-exchange-modal.component';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MainFacade],
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  resultList: ModelWithCollectionState<BookOfferModel>[];

  private userOffersList: BookOfferModel[];

  private searchParams: BookOfferSearchParams = {};

  readonly isAuthtorized$: Observable<boolean>;

  user: UserModel;

  constructor(
    private mainFacade: MainFacade,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private router: Router,
    private modalDialogService: ModalDialogService
  ) {
    this.isAuthtorized$ = this.mainFacade.isAuthrorized$;
  }

  ngOnInit(): void {
    this.fetchAllOffers();

    this.subscriptions.add(
      this.mainFacade.getUserInfoWithOffers().subscribe({
        next: ({ user, bookOffers }) => {
          this.userOffersList = bookOffers;
          this.user = user;
        },
        error: (error: HttpErrorResponse) => {
          console.log('Unauthorized');
        },
      })
    );
  }

  private fetchAllOffers() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.mainFacade.getAllOffers().subscribe({
        next: (result) => {
          this.resultList = result;
          this.loadingService.setLoading(false);
        },
        error: (error: HttpErrorResponse) => {
          this.loadingService.setLoading(false);
          this.alertService.showError(
            `Ошибка при получении данных ${error.status}`
          );
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onFilterChanges(changes: Omit<BookOfferSearchParams, 'text'>) {
    this.searchParams = {
      ...this.searchParams,
      ...changes,
    };

    console.log(this.searchParams);
  }

  navigateToDetailsPage(id: number) {
    this.router.navigate([AppRoutes.BOOK_OFFER, id]);
  }

  search(text: string) {
    this.loadingService.setLoading(true);

    this.searchParams = {
      ...this.searchParams,
      text,
    };

    this.subscriptions.add(
      this.mainFacade.search(this.searchParams).subscribe({
        next: (result) => {
          this.resultList = result;
          this.loadingService.setLoading(false);
        },
        error: (error: HttpErrorResponse) => {
          this.loadingService.setLoading(false);
          this.alertService.showError(`Ошибка при поиске ${error.status}`);
        },
      })
    );
  }

  toggleCollectionState(offer: ModelWithCollectionState<BookOfferModel>) {
    this.mainFacade.toggleCollectionState(offer);
  }

  private createOfferExchage({ fromOfferId, toOfferId }: CreateExchangeOutput) {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.mainFacade
        .createExchange({
          fromOfferId,
          toOfferId,
        })
        .subscribe({
          next: () => {
            this.alertService.showSuccess('Заяка на обмен успешно отправлена');
            this.loadingService.setLoading(false);
            this.fetchAllOffers();
          },
          error: (error: HttpErrorResponse) => {
            this.loadingService.setLoading(false);
            this.alertService.showError(
              `Ошибка при создании заявки на обмен ${error.status}`
            );
          },
        })
    );
  }

  openCreateExchangeModal(fromOfferId: number) {
    this.subscriptions.add(
      this.modalDialogService
        .open(CreateExchangeModalComponent, {
          id: fromOfferId,
          userOffers: this.userOffersList,
        } as CreateExchangeInput)
        .subscribe((out) => {
          this.createOfferExchage(out as CreateExchangeOutput);
        })
    );
  }
}
