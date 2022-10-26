import { AuthService } from '@features/auth';
import { BookOffersService } from '@features/book-offers/services/book-offers.services';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookOfferModel, CommentModel } from '@book-sharing/api-interfaces';

@Injectable()
export class BookOfferInfoFacade {
  constructor(
    private bookOffersService: BookOffersService,
    private authService: AuthService
  ) {}

  getOfferById(id: number): Observable<BookOfferModel> {
    return this.bookOffersService.findById(id);
  }

  addComment(id: number, text: string): Observable<CommentModel> {
    return this.bookOffersService.createComment(id, { text });
  }

  hasCommentForm$(): Observable<boolean> {
    return this.authService.isAuthorized$;
  }
}
