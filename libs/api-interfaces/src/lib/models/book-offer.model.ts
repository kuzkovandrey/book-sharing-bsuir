import { BookModel } from './book.model';
import { Model } from './base.model';
import { DeliveryModel } from './delivery.model';
import { UserModel } from './user.model';

export type BookOffer = {
  user: UserModel;
  delivery: DeliveryModel;
  book: BookModel;
  isActive: boolean;
};

export type BookOfferModel = Model<BookOffer>;
