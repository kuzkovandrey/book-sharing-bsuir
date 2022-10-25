import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '@core/services/alert.service';
import { LoadingService } from '@core/services/loading.service';
import { MainFacade } from './services/main.facade';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  BookOfferModel,
  BookOfferSearchParams,
  DeliveryTypes,
  OfferType,
} from '@book-sharing/api-interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MainFacade],
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  resultList: BookOfferModel[];

  private searchParams: BookOfferSearchParams = {};

  constructor(
    private mainFacade: MainFacade,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
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

  search(text: string) {
    console.log(text);

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
}
