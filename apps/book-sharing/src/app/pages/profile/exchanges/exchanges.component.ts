import { UserInfoFacade } from './../services/user-info.facade';
import { AlertService } from '@core/services/alert.service';
import { LoadingService } from '@core/services/loading.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ChangeExchangeStatusDto,
  ExchangeModel,
  UserModel,
} from '@book-sharing/api-interfaces';
import { UserExchangesFacade } from '../services/user-exchanges.facade';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss'],
})
export class ExchangesComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  exchangeList: ExchangeModel[];

  user: UserModel;

  constructor(
    private readonly userExchangesFacade: UserExchangesFacade,
    private readonly loadingService: LoadingService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit() {
    this.fetchAllExchanges();
    this.fetchUserInfo();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private fetchUserInfo() {
    this.subscriptions.add(
      this.userExchangesFacade.getUserInfo().subscribe({
        next: (user) => {
          this.user = user;
        },
        error: ({ status }: HttpErrorResponse) => {
          this.alertService.showError(
            `Ошибка при загрузке данных пользователя ${status}`
          );
        },
      })
    );
  }

  private fetchAllExchanges() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.userExchangesFacade.getAll().subscribe({
        next: (exchangeList) => {
          this.exchangeList = exchangeList;
          this.loadingService.setLoading(false);
        },
        error: ({ status }: HttpErrorResponse) => {
          this.loadingService.setLoading(false);
          this.alertService.showError(`Ошибка при загрузке данных ${status}`);
        },
      })
    );
  }

  handleChangeExchangeState(dto: ChangeExchangeStatusDto) {
    this.subscriptions.add(
      this.userExchangesFacade.setExchangeStatus(dto).subscribe({
        next: () => {
          this.loadingService.setLoading(false);
          this.fetchAllExchanges();
        },
        error: () => {
          this.loadingService.setLoading(false);
          this.alertService.showError(
            `Ошибка при изменении статута обмена ${status}`
          );
        },
      })
    );
  }
}
