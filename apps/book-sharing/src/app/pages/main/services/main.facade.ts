import { ModelWithCollectionState } from './../../../features/collections/services/collection.service';
import { CollectionService } from '@features/collections/services/collection.service';
import { AuthService } from '@features/auth';
import { BookOffersService } from '@features/book-offers/services/book-offers.services';
import {
  BookOfferModel,
  BookOfferSearchParams,
} from '@book-sharing/api-interfaces';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MainFacade {
  get isAuthrorized$(): Observable<boolean> {
    return this.authService.isAuthorized$;
  }

  constructor(
    private bookOffersService: BookOffersService,
    private authService: AuthService,
    private collectionService: CollectionService
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
}
