import {
  BookOfferSearchParams,
  ChangeOfferValuesDto,
  CreateBookOfferDto,
  CreateCommentDto,
} from '@book-sharing/api-interfaces';
import { BookOffersService } from '../services';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiControllers } from '@book-sharing/api-interfaces';
import { BaseController } from '@core';
import { BookOfferEntity, CommentEntity } from '../entities';
import { AccessTokenGuard } from '@auth/guards';
import { AuthPayload, AuthPayloadType } from '@auth/decorators';
import { SearchParams } from '../utils';

@Controller(ApiControllers.BOOK_OFFERS)
export class BookOffersController extends BaseController {
  constructor(private readonly bookOffersService: BookOffersService) {
    super(BookOffersController.name);
  }

  @Get()
  findAll(): Promise<BookOfferEntity[]> {
    return this.bookOffersService.findAll();
  }

  @Get(ApiControllers.SEARCH)
  search(@SearchParams() params: BookOfferSearchParams) {
    return this.bookOffersService.search(params.text, { ...params });
  }

  @Get(`${ApiControllers.USER}/:id`)
  findAllByUserId(@Param('id') id: number): Promise<BookOfferEntity[]> {
    return this.bookOffersService.findAllByUserId(id);
  }

  @Get(':id')
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
  @Patch(':id')
  changeValues(@Body() changes: ChangeOfferValuesDto, @Param('id') id: number) {
    try {
      return this.bookOffersService.changeValues(id, changes);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }

  @Get(`${ApiControllers.COMMENTS}/:id`)
  getAllComments(@Param('id') id: number): Promise<CommentEntity[]> {
    return this.bookOffersService.getAllComments(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post(`${ApiControllers.COMMENTS}/:id`)
  createComment(
    @Param('id') offerId: number,
    @Body() { text }: CreateCommentDto,
    @AuthPayload() { userId }: AuthPayloadType
  ): Promise<CommentEntity> {
    return this.bookOffersService.createComment(offerId, userId, text);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteBookOffer(@Param('id') offerId: number) {
    return this.bookOffersService.delete(offerId);
  }
}
