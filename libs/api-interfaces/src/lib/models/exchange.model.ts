import { ExchangeStatus } from '../values';
import { Model } from './base.model';
import { BookOfferModel } from './book-offer.model';

export type Exchange = {
  from: BookOfferModel;
  to: BookOfferModel;
  status: ExchangeStatus;
};

export type ExchangeModel = Model<Exchange>;
