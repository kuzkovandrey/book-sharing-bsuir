import { CommentModel } from './comment.model';
import { BookModel } from './book.model';
import { Model } from './base.model';
import { UserModel } from './user.model';
import { OfferType, DeliveryTypes } from '../values';
import { LocationModel } from './location.model';

export type BookOffer = {
  user: UserModel;
  deliveryType: DeliveryTypes;
  offerType: OfferType;
  // offerStatus: BookOfferStatus;
  book: BookModel;
  isActive: boolean;
  info: string;
  comments?: CommentModel[];
  location?: LocationModel;
};

export type BookOfferModel = Model<BookOffer>;
