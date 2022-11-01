import { ExchangesService } from './../services/exhanges.service';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiControllers,
  CreateExchangeDto,
  ChangeExchangeStatusDto,
} from '@book-sharing/api-interfaces';
import { BaseController } from '@core';
import { AccessTokenGuard } from '@auth/guards';
import { AuthPayload, AuthPayloadType } from '@auth/decorators';

@Controller(ApiControllers.EXCHANGES)
export class ExchangesController extends BaseController {
  constructor(private readonly exchangesService: ExchangesService) {
    super('exchanges');
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  createExchange(
    @Body() createExchange: CreateExchangeDto,
    @AuthPayload() { userId }: AuthPayloadType
  ) {
    return this.exchangesService.createExchange(userId, createExchange);
  }

  @UseGuards(AccessTokenGuard)
  @Patch()
  setExchangesStatusById(
    @AuthPayload() { userId }: AuthPayloadType,
    @Body() { exchangeId, status }: ChangeExchangeStatusDto
  ) {
    return this.exchangesService.setExchangesStatusById(
      exchangeId,
      userId,
      status
    );
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAllByUserId(@AuthPayload() { userId }: AuthPayloadType) {
    return this.exchangesService.findAllByUserId(userId);
  }
}
