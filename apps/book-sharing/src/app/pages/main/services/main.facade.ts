import { CreateExchangeDto } from './../../../../../../../libs/api-interfaces/src/lib/dto/create-exchange.dto';
import { ExchangesService } from '@features/exchanges/services/exchages.service';
import { UserService } from '@features/user/services/user.service';
import { ModelWithCollectionState } from '@features/collections/services/collection.service';
import { CollectionService } from '@features/collections/services/collection.service';
import { AuthService } from '@features/auth';
import { BookOffersService } from '@features/book-offers/services/book-offers.services';
import {
  BookOfferModel,
  BookOfferSearchParams,
  ExchangeModel,
  UserModel,
} from '@book-sharing/api-interfaces';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';

export interface UserInfoWithOffers {
  user: UserModel;
  bookOffers: BookOfferModel[];
}

@Injectable({ providedIn: 'root' })
export class MainFacade {
  get isAuthrorized$(): Observable<boolean> {
    return this.authService.isAuthorized$;
  }

  constructor(
    private bookOffersService: BookOffersService,
    private authService: AuthService,
    private collectionService: CollectionService,
    private userService: UserService,
    private exchangesService: ExchangesService
  ) {}

  search(
    params: BookOfferSearchParams
  ): Observable<ModelWithCollectionState<BookOfferModel>[]> {
    return this.bookOffersService
      .search(params)
      .pipe(map((list) => list.map(this.mapToWithCollection)));
  }

  getAllOffers(): Observable<ModelWithCollectionState<BookOfferModel>[]> {
    return this.bookOffersService
      .findAll()
      .pipe(map((list) => list.map(this.mapToWithCollection)));
  }

  private mapToWithCollection = this.collectionService.mapToWithCollection;

  toggleCollectionState(offer: ModelWithCollectionState<BookOfferModel>) {
    this.collectionService.toggleCollectionState(offer.id);
    offer.inCollection = !offer.inCollection;
  }

  getUserInfoWithOffers(): Observable<UserInfoWithOffers> {
    return this.authService.isAuthorized$.pipe(
      switchMap((isAuth) => {
        if (isAuth)
          return this.userService.getPersonalInfo().pipe(
            switchMap((user) => {
              return this.bookOffersService
                .findAllByUserId(user.id)
                .pipe(map((bookOffers) => ({ bookOffers, user })));
            })
          );

        return of({ user: null, bookOffers: [] } as UserInfoWithOffers);
      })
    );
  }

  createExchange(dto: CreateExchangeDto): Observable<ExchangeModel> {
    return this.exchangesService.createExchange(dto);
  }
}
