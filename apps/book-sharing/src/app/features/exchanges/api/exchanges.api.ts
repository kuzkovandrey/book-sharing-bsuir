import { Injectable } from '@angular/core';
import { ApiGateway } from '@core/api';
import {
  ApiControllers,
  CreateExchangeDto,
  ChangeExchangeStatusDto,
  ExchangeModel,
} from '@book-sharing/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExchangesApi {
  constructor(private readonly api: ApiGateway) {}

  createExchange(body: CreateExchangeDto): Observable<ExchangeModel> {
    return this.api.post({ url: ApiControllers.EXCHANGES, body });
  }

  setExchangeStatus(body: ChangeExchangeStatusDto): Observable<ExchangeModel> {
    return this.api.patch({ url: ApiControllers.EXCHANGES, body });
  }

  getAllUserExchanges(): Observable<ExchangeModel[]> {
    return this.api.get({ url: ApiControllers.EXCHANGES });
  }
}
