import { DeliveryTypes } from './delivery-types.enum';
import { OfferType } from './offer-type.enum';

export enum BookOfferQueries {
  USERNAME = 'username',
  IS_ACTIVE = 'isActive',
  DELIVERY_TYPE = 'deliveryType',
  OFFER_TYPE = 'offerType',
  TEXT = 'text',
}

export type BookOfferSearchParams = Partial<{
  username: string;
  isActive: boolean;
  deliveryType: DeliveryTypes;
  offerType: OfferType;
  text: string;
}>;
