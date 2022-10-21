import { Model } from './base.model';

export type User = {
  name: string;
  email: string;
  password: string;
};

export type UserModel = Model<User>;
