import { DeliveryTypes } from '../values';
import { CreateBookDto } from './create-book.dto';

export interface CreateBookOfferDto {
  book: CreateBookDto;
  deliveryType: DeliveryTypes;
  info: string;
  isActive?: boolean;
}

export type ChangeOfferValuesDto = Omit<CreateBookOfferDto, 'book'>;
