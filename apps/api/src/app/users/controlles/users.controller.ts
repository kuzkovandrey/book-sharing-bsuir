import { AuthPayload, AuthPayloadType } from '@auth/decorators';
import { AccessTokenGuard } from '@auth/guards';
import { ApiControllers, CreateUserDto } from '@book-sharing/api-interfaces';
import { BaseController } from '@core';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from '@users/entities';
import { UsersService } from '../services';

@Controller(ApiControllers.USERS)
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super(UsersController.name);
  }

  @Get(`${ApiControllers.USER}/:id`)
  async getInfo(@Param('id') id: number): Promise<Partial<UserEntity>> {
    try {
      return await this.usersService.getUserInfo(id);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get(ApiControllers.PERSONAL_INFO)
  async getPersonalInfo(@AuthPayload() payload: AuthPayloadType) {
    try {
      return await this.usersService.getUserInfo(payload.userId);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }

  @UseGuards(AccessTokenGuard)
  @Patch(ApiControllers.PERSONAL_INFO)
  async changeValues(
    @Body() changes: Partial<Omit<CreateUserDto, 'refreshToken'>>,
    @AuthPayload() { userId }: AuthPayloadType
  ): Promise<Partial<UserEntity>> {
    try {
      return await this.usersService.updateUserInfo(userId, changes);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }

  @UseGuards(AccessTokenGuard)
  @Delete()
  async delete(@AuthPayload() { userId }: AuthPayloadType) {
    try {
      return await this.usersService.deleteUser(userId);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }
}
