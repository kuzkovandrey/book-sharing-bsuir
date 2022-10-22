import { ApiControllers } from '@book-sharing/api-interfaces';
import { BaseController } from '@core';
import { Controller } from '@nestjs/common';
import { UsersService } from '../services';

@Controller(ApiControllers.USERS)
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super(UsersController.name);
  }
}
