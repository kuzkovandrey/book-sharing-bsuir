import { UsersService } from '@users/services';
import {
  BookOfferSearchParams,
  ChangeOfferValuesDto,
  CreateBookOfferDto,
} from '@book-sharing/api-interfaces';
import { BookOfferEntity, CommentEntity } from './../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from '@books';
import { Like, Repository } from 'typeorm';
import { CommentsService } from './comments.service';

@Injectable()
export class BookOffersService {
  private readonly selectOptions = {
    user: {
      id: true,
      username: true,
      email: true,
      password: false,
      createdAt: true,
      refreshToken: false,
      telephones: true,
    },
  } as const;

  private readonly findRelations = {
    book: {
      genre: true,
      publisher: true,
      pictures: true,
      authors: true,
      language: true,
    },
    user: true,
  };

  constructor(
    @InjectRepository(BookOfferEntity)
    private readonly bookOffersRepository: Repository<BookOfferEntity>,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService
  ) {}

  findAll(): Promise<BookOfferEntity[]> {
    return this.bookOffersRepository.find({
      select: this.selectOptions,
      relations: this.findRelations,
    });
  }

  findAllByUserId(id: number): Promise<BookOfferEntity[]> {
    return this.bookOffersRepository.find({
      where: {
        user: { id },
      },
      select: this.selectOptions,
      relations: this.findRelations,
    });
  }

  findById(id: number): Promise<BookOfferEntity> {
    return this.bookOffersRepository.findOneOrFail({
      where: { id },
      relations: {
        ...this.findRelations,
        comments: { user: true },
      },
      select: {
        ...this.selectOptions,
        comments: true,
      },
    });
  }
  search(
    text: string,
    { isActive, deliveryType, offerType }: BookOfferSearchParams = {}
  ) {
    return this.bookOffersRepository.find({
      where: {
        book: {
          ...(text ? { title: Like(`%${text}%`) } : {}),
        },
        ...(isActive !== undefined ? { isActive } : {}),
        ...(deliveryType !== undefined ? { deliveryType } : {}),
        ...(offerType !== undefined ? { offerType } : {}),
      },
      relations: this.findRelations,
      select: this.selectOptions,
    });
  }

  async create(
    userId: number,
    { book, deliveryType, info, offerType }: CreateBookOfferDto
  ): Promise<BookOfferEntity> {
    const user = await this.usersService.findById(userId);
    const createdBook = await this.booksService.create(book);

    const offer = this.bookOffersRepository.create({
      info,
      book: createdBook,
      deliveryType,
      user,
      offerType,
    });

    return offer.save();
  }

  async delete(id: number): Promise<unknown> {
    await this.bookOffersRepository.findOneByOrFail({ id });

    return await this.bookOffersRepository.softDelete({ id });
  }

  async changeValues(
    id: number,
    { isActive, info, deliveryType, offerType }: Partial<ChangeOfferValuesDto>
  ): Promise<BookOfferEntity> {
    const offer = await this.bookOffersRepository.findOneByOrFail({ id });

    offer.offerType = offerType ?? offer.offerType;
    offer.deliveryType = deliveryType ?? offer.deliveryType;
    offer.isActive = isActive ?? offer.isActive;
    offer.info = info ?? offer.info;

    return offer.save();
  }

  getAllComments(offerId: number): Promise<CommentEntity[]> {
    return this.commentsService.findAllByBookOfferId(offerId);
  }

  async createComment(
    offerId: number,
    userId: number,
    text: string
  ): Promise<CommentEntity> {
    const user = await this.usersService.findById(userId);
    const offer = await this.bookOffersRepository.findOneByOrFail({
      id: offerId,
    });

    return this.commentsService.create(user, offer, text);
  }
}
