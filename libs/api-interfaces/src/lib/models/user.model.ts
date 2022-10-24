import { TelephoneModel } from './telephone.model';
import { Model } from './base.model';

export type User = {
  username: string;
  email: string;
  password?: string;
  telephones?: TelephoneModel[];
};

export type UserModel = Model<User>;
