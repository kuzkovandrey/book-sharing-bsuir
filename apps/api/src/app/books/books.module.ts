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
import { BooksService } from './services/books.service';

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
  providers: [BooksService],
})
export class BooksModule {}
