import { UsersService } from '@users/services';
import {
  ChangeOfferValuesDto,
  CreateBookOfferDto,
} from '@book-sharing/api-interfaces';
import { BookOfferEntity } from './../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from '@books';
import { Repository } from 'typeorm';
import { DeliveriesInitService } from './deliveries.service';

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
    },
  } as const;

  private readonly findRelations = {
    book: {
      genre: true,
      publisher: true,
      pictures: true,
      authors: true,
    },
    user: true,
  };

  constructor(
    @InjectRepository(BookOfferEntity)
    private readonly bookOffersRepository: Repository<BookOfferEntity>,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
    private readonly deliveriesInitService: DeliveriesInitService
  ) {}

  findAll(): Promise<BookOfferEntity[]> {
    return this.bookOffersRepository.find({
      select: this.selectOptions,
      relations: this.findRelations,
    });
  }

  findById(id: number): Promise<BookOfferEntity> {
    return this.bookOffersRepository.findOneOrFail({
      where: { id },
      relations: this.findRelations,
      select: this.selectOptions,
    });
  }

  async create(
    userId: number,
    { book, deliveryType, info }: CreateBookOfferDto
  ): Promise<BookOfferEntity> {
    const user = await this.usersService.findById(userId);
    const createdBook = await this.booksService.create(book);

    const delivery = await this.deliveriesInitService.findByType(deliveryType);

    const offer = this.bookOffersRepository.create({
      info,
      book: createdBook,
      delivery,
      user,
    });

    return offer.save();
  }

  async delete(id: number): Promise<unknown> {
    await this.bookOffersRepository.findOneByOrFail({ id });

    return await this.bookOffersRepository.softDelete({ id });
  }

  async changeValues(
    id: number,
    { isActive, info, deliveryType }: Partial<ChangeOfferValuesDto>
  ): Promise<BookOfferEntity> {
    const offer = await this.bookOffersRepository.findOneByOrFail({ id });

    if (deliveryType) {
      const delivery = await this.deliveriesInitService.findByType(
        deliveryType
      );
      offer.delivery = delivery;
    }

    offer.isActive = isActive ?? offer.isActive;
    offer.info = info ?? offer.info;

    return offer.save();
  }
}
