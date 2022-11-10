import { PublishersService } from './publishers.service';
import { PicturesService } from './pictures.service';
import { LanguagesService } from './language.service';
import { GenresService } from './genres.service';
import { AuthorsService } from './authors.service';
import { CreateBookDto } from '@book-sharing/api-interfaces';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from '../entities';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly booksRepository: Repository<BookEntity>,
    private readonly authorsService: AuthorsService,
    private readonly genresService: GenresService,
    private readonly languagesService: LanguagesService,
    private readonly picturesService: PicturesService,
    private readonly publishersService: PublishersService
  ) {}

  async create(book: CreateBookDto): Promise<BookEntity> {
    const publisher = await this.publishersService.createIfNotExists(
      book.publisher
    );

    Logger.log('CREATE ENTITY publisher', publisher);

    const pictures = await this.picturesService.createMany(book.pictures);
    const language = await this.languagesService.createIfNotExists(
      book.language
    );

    Logger.log('CREATE ENTITY language', language);

    const genre = await this.genresService.createIfNotExists(book.genre);

    Logger.log('CREATE ENTITY genre', genre);

    const authors = await this.authorsService.createMany(book.authors);

    return await this.booksRepository
      .create({
        title: book.title,
        description: book.description,
        pageCount: book.pageCount,
        publicationYear: book.publicationYear,
        publisher,
        pictures,
        language,
        genre,
        authors,
      })
      .save();
  }
}
