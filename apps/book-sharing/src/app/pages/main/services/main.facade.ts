import { BookOffersService } from '@features/book-offers/services/book-offers.services';
import {
  BookOfferModel,
  BookOfferSearchParams,
} from '@book-sharing/api-interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MainFacade {
  constructor(private bookOffersService: BookOffersService) {}

  search(params: BookOfferSearchParams): Observable<BookOfferModel[]> {
    return this.bookOffersService.search(params);
  }

  getAllOffers(): Observable<BookOfferModel[]> {
    return this.bookOffersService.findAll();
  }
}
