import { LocationRegion } from '../values/location-region.enum';
import { Model } from './base.model';

export type Location = {
  region: LocationRegion;
  city: string;
};

export type LocationModel = Model<Location>;
