import { ExchangesApi } from './../api/exchanges.api';
import { Injectable } from '@angular/core';
import {
  CreateExchangeDto,
  ChangeExchangeStatusDto,
  ExchangeModel,
} from '@book-sharing/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExchangesService {
  constructor(private readonly exchangesApi: ExchangesApi) {}

  createExchange(body: CreateExchangeDto): Observable<ExchangeModel> {
    return this.exchangesApi.createExchange(body);
  }

  setExchangeStatus(body: ChangeExchangeStatusDto): Observable<ExchangeModel> {
    return this.exchangesApi.setExchangeStatus(body);
  }

  getAllUserExchanges(): Observable<ExchangeModel[]> {
    return this.exchangesApi.getAllUserExchanges();
  }

  getAllExchanges(): Observable<ExchangeModel[]> {
    return this.exchangesApi.getAllExchanges();
  }
}
