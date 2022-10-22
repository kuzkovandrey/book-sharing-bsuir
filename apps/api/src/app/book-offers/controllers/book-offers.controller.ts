import {
  ChangeOfferValuesDto,
  CreateBookOfferDto,
} from '@book-sharing/api-interfaces';
import { BookOffersService } from '../services';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiControllers } from '@book-sharing/api-interfaces';
import { BaseController } from '@core';
import { BookOfferEntity } from '../entities';
import { AccessTokenGuard } from '@auth/guards';
import { AuthPayload, AuthPayloadType } from '@auth/decorators';

@Controller(ApiControllers.BOOK_OFFERS)
export class BookOffersController extends BaseController {
  constructor(private readonly bookOffersService: BookOffersService) {
    super(BookOffersController.name);
  }

  @Get()
  findAll(): Promise<BookOfferEntity[]> {
    return this.bookOffersService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    try {
      return this.bookOffersService.findById(id);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  create(
    @Body() createBookOfferDto: CreateBookOfferDto,
    @AuthPayload() { userId }: AuthPayloadType
  ) {
    try {
      return this.bookOffersService.create(userId, createBookOfferDto);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }

  @UseGuards(AccessTokenGuard)
  @Patch()
  changeValues(
    @Body() changes: ChangeOfferValuesDto,
    @AuthPayload() { userId }: AuthPayloadType
  ) {
    try {
      return this.bookOffersService.changeValues(userId, changes);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }
}
