import { Location } from '../models';
import { DeliveryTypes, OfferType } from '../values';
import { CreateBookDto } from './create-book.dto';

export interface CreateBookOfferDto {
  book: CreateBookDto;
  deliveryType: DeliveryTypes;
  offerType: OfferType;
  // offerStatus: BookOfferStatus;
  location: Location;
  info: string;
  isActive?: boolean;
}

export type ChangeOfferValuesDto = Omit<CreateBookOfferDto, 'book'>;
