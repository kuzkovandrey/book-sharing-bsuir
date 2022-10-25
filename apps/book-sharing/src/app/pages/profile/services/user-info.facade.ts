import { map, Observable, switchMap } from 'rxjs';
import { BookOffersService } from '@features/book-offers/services/book-offers.services';
import { UserService } from '@features/user/services/user.service';
import { Injectable } from '@angular/core';
import {
  UserModel,
  BookOfferModel,
  CreateUserDto,
} from '@book-sharing/api-interfaces';

export interface UserInfoWithOffers {
  user: UserModel;
  bookOffers: BookOfferModel[];
}

@Injectable()
export class UserInfoFacade {
  constructor(
    private readonly userService: UserService,
    private readonly bookOffersService: BookOffersService
  ) {}

  getUserInfoWithOffers(): Observable<UserInfoWithOffers> {
    return this.userService.getPersonalInfo().pipe(
      switchMap((user) => {
        return this.bookOffersService
          .findAllByUserId(user.id)
          .pipe(map((bookOffers) => ({ bookOffers, user })));
      })
    );
  }

  changeUserInfo(
    changes: Partial<Omit<CreateUserDto, 'refreshToken'>>
  ): Observable<UserModel> {
    return this.userService.updateUserInfo(changes);
  }
}
