import { AuthorModel } from './author.model';
import { Model } from './base.model';
import { GenreModel } from './genre.model';
import { LanguageModel } from './language.model';
import { PictureModel } from './picture.model';
import { PublisherModel } from './publisher.model';

export type Book = {
  title: string;
  description: string;
  pageCount: number;
  publicationYear: number;
  language: LanguageModel;
  genre: GenreModel;
  publisher: PublisherModel;
  pictures: PictureModel[];
  authors: AuthorModel[];
};

export type BookModel = Model<Book>;
