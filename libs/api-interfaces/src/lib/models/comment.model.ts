import { Model } from './base.model';
import { UserModel } from './user.model';

export type Comment = {
  text: string;
  user: UserModel;
};

export type CommentModel = Model<Comment>;
