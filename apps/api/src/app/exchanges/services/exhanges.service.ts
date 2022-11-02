import { BookOffersService } from '../../book-offers/services';
import { ExchangeEntity } from './../entities/exhange.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import {
  CreateExchangeDto,
  ExchangeStatus,
} from '@book-sharing/api-interfaces';

@Injectable()
export class ExchangesService {
  private readonly searchRelations: FindOptionsRelations<ExchangeEntity> = {
    from: {
      book: {
        pictures: true,
      },
      user: true,
      location: true,
    },
    to: {
      book: {
        pictures: true,
      },
      user: true,
      location: true,
    },
  };

  constructor(
    @InjectRepository(ExchangeEntity)
    private readonly exchangesRepository: Repository<ExchangeEntity>,
    private readonly bookOffersService: BookOffersService
  ) {}

  async createExchange(
    userId: number,
    { fromOfferId, toOfferId }: CreateExchangeDto
  ): Promise<ExchangeEntity> {
    const from = await this.bookOffersService.findById(fromOfferId);
    const to = await this.bookOffersService.findById(toOfferId);

    if (from.user.id !== userId)
      throw new Error('Not permisions for change ExchangeStatus');

    from.isActive = false;
    to.isActive = false;

    const exchange = await this.exchangesRepository.create({ from, to }).save();

    await from.save();
    await to.save();

    return exchange;
  }

  async setExchangesStatusById(
    exchangeId: number,
    userId: number,
    status: ExchangeStatus
  ) {
    const exchange = await this.exchangesRepository.findOneOrFail({
      where: {
        id: exchangeId,
      },
      relations: {
        from: { location: true, user: true, book: { pictures: true } },
        to: { location: true, user: true, book: { pictures: true } },
      },
    });

    console.log(exchange);

    if (exchange.to.user.id !== userId)
      throw new Error('Not permisions for change ExchangeStatus');

    if (status === ExchangeStatus.CONFIRM) {
      exchange.status = ExchangeStatus.CONFIRM;
      return await exchange.save();
    } else {
      const from = await this.bookOffersService.findById(exchange.from.id);
      const to = await this.bookOffersService.findById(exchange.to.id);

      from.isActive = true;
      to.isActive = true;
      exchange.status = ExchangeStatus.CANCLE;

      await from.save();
      await to.save();
      await exchange.save();

      await this.exchangesRepository.remove(exchange);
    }
  }

  findAll(): Promise<ExchangeEntity[]> {
    return this.exchangesRepository.find({
      relations: {
        ...this.searchRelations,
      },
    });
  }

  findAllByUserId(id: number): Promise<ExchangeEntity[]> {
    return this.exchangesRepository.find({
      where: [
        {
          from: { user: { id } },
        },
        {
          to: { user: { id } },
        },
      ],
      relations: this.searchRelations,
    });
  }
}
