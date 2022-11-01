import { AuthService } from '@features/auth';
import {
  CollectionService,
  ModelWithCollectionState,
} from '@features/collections/services/collection.service';
import {
  map,
  mergeAll,
  mergeMap,
  Observable,
  of,
  switchMap,
  toArray,
} from 'rxjs';
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
    private readonly bookOffersService: BookOffersService,
    private readonly collectionService: CollectionService,
    private readonly authService: AuthService
  ) {}

  logout(): Observable<unknown> {
    return this.authService.logout();
  }

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

  getBookOffersFromCollection(): Observable<
    ModelWithCollectionState<BookOfferModel>[]
  > {
    return of(this.collectionService.getCollectionList()).pipe(
      mergeAll(),
      mergeMap((id) =>
        this.bookOffersService
          .findById(id)
          .pipe(
            map((offer) => this.collectionService.mapToWithCollection(offer))
          )
      ),
      toArray()
    );
  }

  toggleCollectionState(offer: ModelWithCollectionState<BookOfferModel>) {
    this.collectionService.toggleCollectionState(offer.id);
    offer.inCollection = !offer.inCollection;
  }
}
