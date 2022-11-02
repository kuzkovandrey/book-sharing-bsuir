import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '@core/services/alert.service';
import { LoadingService } from '@core/services/loading.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExchangesService } from '@features/exchanges/services/exchages.service';
import { Subscription } from 'rxjs';
import {
  ExchangeModel,
  exchangeStatusToText,
} from '@book-sharing/api-interfaces';

interface TableRow {
  id: number;
  fromTitle: string;
  fromUser: string;
  fromRegion: string;
  toTitle: string;
  toUser: string;
  toRegion: string;
  status: string;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  readonly tableColumn = [
    'id',
    'fromTitle',
    'fromUser',
    'fromRegion',
    'toTitle',
    'toUser',
    'toRegion',
    'status',
  ];

  tableList: TableRow[];

  constructor(
    private readonly exchangesService: ExchangesService,
    private readonly loadingService: LoadingService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.exchangesService.getAllExchanges().subscribe({
        next: (exchanges) => {
          this.loadingService.setLoading(false);
          this.tableList = this.mapToTableList(exchanges);
        },
        error: ({ status }: HttpErrorResponse) => {
          this.loadingService.setLoading(false);
          this.alertService.showError(`Ошибка получения данных ${status}`);
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private mapToTableList = (models: ExchangeModel[]): TableRow[] => {
    return models.map(({ from, to, status, id }) => ({
      id,
      status: exchangeStatusToText(status),
      fromTitle: from.book.title,
      fromUser: from.user.username,
      fromRegion: `${from.location.region}, ${from.location.city}`,
      toTitle: to.book.title,
      toUser: to.user.username,
      toRegion: `${to.location.region}, ${to.location.city}`,
    }));
  };
}
