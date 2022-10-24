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

  search(params: BookOfferSearchParams): Observable<BookOfferModel[]> {
    return this.api.get({
      url: `${ApiControllers.BOOK_OFFERS}${ApiControllers.SEARCH}`,
      params: {
        ...params,
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

  changeValues(changes: ChangeOfferValuesDto): Observable<BookOfferModel> {
    return this.api.patch({ url: ApiControllers.BOOK_OFFERS, body: changes });
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
}
