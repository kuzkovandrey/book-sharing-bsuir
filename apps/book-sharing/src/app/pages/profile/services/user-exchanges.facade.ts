import { UserService } from '@features/user/services/user.service';
import { ExchangesService } from '@features/exchanges/services/exchages.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ExchangeModel,
  UserModel,
  ChangeExchangeStatusDto,
} from '@book-sharing/api-interfaces';

@Injectable()
export class UserExchangesFacade {
  constructor(
    private readonly exchangesService: ExchangesService,
    private readonly userService: UserService
  ) {}

  getAll(): Observable<ExchangeModel[]> {
    return this.exchangesService.getAllUserExchanges();
  }

  getUserInfo(): Observable<UserModel> {
    return this.userService.getPersonalInfo();
  }

  setExchangeStatus(dto: ChangeExchangeStatusDto): Observable<ExchangeModel> {
    return this.exchangesService.setExchangeStatus(dto);
  }
}
