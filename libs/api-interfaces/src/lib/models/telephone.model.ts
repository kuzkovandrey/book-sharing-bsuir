import { BookModel } from './book.model';
import { Model } from './base.model';
import { DeliveryModel } from './delivery.model';
import { UserModel } from './user.model';

export type Telephone = {
  telephoneNumber: string;
};

export type TelephoneModel = Model<Telephone>;
