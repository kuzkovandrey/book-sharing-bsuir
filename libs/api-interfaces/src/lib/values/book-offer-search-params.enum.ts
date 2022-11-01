import { DeliveryTypes } from './delivery-types.enum';
import { LocationRegion } from './location-region.enum';
import { OfferType } from './offer-type.enum';

export enum BookOfferQueries {
  IS_ACTIVE = 'isActive',
  DELIVERY_TYPE = 'deliveryType',
  OFFER_TYPE = 'offerType',
  TEXT = 'text',
  REGION = 'region',
}

export type BookOfferSearchParams = Partial<{
  isActive: boolean;
  deliveryType: DeliveryTypes;
  offerType: OfferType;
  text: string;
  region: LocationRegion;
}>;
