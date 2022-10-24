import { Observable } from 'rxjs';
import { BookOffersApi } from '../api/book-offers.api';
import { Injectable } from '@angular/core';
import {
  ApiControllers,
  BookOfferModel,
  BookOfferSearchParams,
  ChangeOfferValuesDto,
  CommentModel,
  CreateBookOfferDto,
  CreateCommentDto,
} from '@book-sharing/api-interfaces';

@Injectable({ providedIn: 'root' })
export class BookOffersService {
  constructor(private api: BookOffersApi) {}

  findAll(): Observable<BookOfferModel[]> {
    return this.api.findAll();
  }

  search(params: BookOfferSearchParams): Observable<BookOfferModel[]> {
    return this.api.search(params);
  }

  findAllByUserId(id: number): Observable<BookOfferModel[]> {
    return this.api.findAllByUserId(id);
  }

  findById(id: number): Observable<BookOfferModel> {
    return this.api.findById(id);
  }

  create(createBookOfferDto: CreateBookOfferDto): Observable<BookOfferModel> {
    return this.api.create(createBookOfferDto);
  }

  changeValues(changes: ChangeOfferValuesDto): Observable<BookOfferModel> {
    return this.api.changeValues(changes);
  }

  getAllComments(offerId: number): Observable<CommentModel[]> {
    return this.api.getAllComments(offerId);
  }

  createComment(
    offerId: number,
    dto: CreateCommentDto
  ): Observable<CommentModel> {
    return this.api.createComment(offerId, dto);
  }
}
