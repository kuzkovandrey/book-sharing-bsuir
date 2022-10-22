import { GenresService } from './services/genres.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthorEntity,
  BookEntity,
  GenreEntity,
  LanguageEntity,
  PictureEntity,
  PublisherEntity,
} from './entities';
import {
  AuthorsService,
  BooksService,
  LanguagesService,
  PicturesService,
  PublishersService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      AuthorEntity,
      GenreEntity,
      LanguageEntity,
      PictureEntity,
      PublisherEntity,
    ]),
  ],
  providers: [
    BooksService,
    AuthorsService,
    GenresService,
    LanguagesService,
    PicturesService,
    PublishersService,
  ],
  exports: [BooksService],
})
export class BooksModule {}
