import { CommentModel } from './comment.model';
import { OfferType } from '@book-sharing/api-interfaces';
import { BookModel } from './book.model';
import { Model } from './base.model';
import { DeliveryModel } from './delivery.model';
import { UserModel } from './user.model';

export type BookOffer = {
  user: UserModel;
  delivery: DeliveryModel;
  offerType: OfferType;
  book: BookModel;
  isActive: boolean;
  info: string;
  comments?: CommentModel[];
};

export type BookOfferModel = Model<BookOffer>;
