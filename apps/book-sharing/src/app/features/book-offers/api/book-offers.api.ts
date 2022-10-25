import { ApiGateway } from '@core/api/api-gateway';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  BookOfferModel,
  ApiControllers,
  BookOfferSearchParams,
  CreateBookOfferDto,
  ChangeOfferValuesDto,
  CreateCommentDto,
  CommentModel,
} from '@book-sharing/api-interfaces';

@Injectable({ providedIn: 'root' })
export class BookOffersApi {
  constructor(private readonly api: ApiGateway) {}

  findAll(): Observable<BookOfferModel[]> {
    return this.api.get({ url: ApiControllers.BOOK_OFFERS });
  }

  search({
    isActive,
    deliveryType,
    offerType,
    text,
  }: BookOfferSearchParams): Observable<BookOfferModel[]> {
    return this.api.get({
      url: `${ApiControllers.BOOK_OFFERS}${ApiControllers.SEARCH}`,
      params: {
        ...(isActive ? { isActive } : {}),
        ...(deliveryType ? { deliveryType } : {}),
        ...(offerType ? { offerType } : {}),
        ...(text ? { text } : {}),
      },
    });
  }

  findAllByUserId(id: number): Observable<BookOfferModel[]> {
    return this.api.get({
      url: `${ApiControllers.BOOK_OFFERS}${ApiControllers.USER}/${id}`,
    });
  }

  findById(id: number): Observable<BookOfferModel> {
    return this.api.get({ url: `${ApiControllers.BOOK_OFFERS}/${id}` });
  }

  create(createBookOfferDto: CreateBookOfferDto): Observable<BookOfferModel> {
    return this.api.post({
      url: ApiControllers.BOOK_OFFERS,
      body: createBookOfferDto,
    });
  }

  changeValues(
    id: number,
    changes: ChangeOfferValuesDto
  ): Observable<BookOfferModel> {
    return this.api.patch({
      url: `${ApiControllers.BOOK_OFFERS}/${id}`,
      body: changes,
    });
  }

  getAllComments(offerId: number): Observable<CommentModel[]> {
    return this.api.get({
      url: `${ApiControllers.BOOK_OFFERS}${ApiControllers.COMMENTS}/${offerId}`,
    });
  }

  createComment(
    offerId: number,
    dto: CreateCommentDto
  ): Observable<CommentModel> {
    return this.api.post({
      url: `${ApiControllers.BOOK_OFFERS}${ApiControllers.COMMENTS}/${offerId}`,
      body: dto,
    });
  }

  delete(id: number): Observable<unknown> {
    return this.api.delete({ url: `${ApiControllers.BOOK_OFFERS}/${id}` });
  }
}
