import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  IncorrectDataError,
  NotFountError,
  UserNotFoundError,
  UserAlredyExistsError,
  IncorrectUserAuthError,
} from './errors';

export abstract class BaseController {
  constructor(private controllerName: string) {}

  throwHttpExeption(error: unknown) {
    if (error instanceof NotFountError) {
      throw new NotFoundException(
        `${this.controllerName.toUpperCase()}: ${error.message}`
      );
    }

    if (error instanceof IncorrectDataError) {
      throw new BadRequestException(
        `${this.controllerName.toUpperCase()}: ${error.message}`
      );
    }

    if (error instanceof UserNotFoundError) {
      throw new NotFoundException(
        `${this.controllerName.toUpperCase()}: ${error.message}`
      );
    }

    if (error instanceof IncorrectUserAuthError) {
      throw new BadRequestException(
        `${this.controllerName.toUpperCase()}: ${error.message}`
      );
    }

    if (error instanceof UserAlredyExistsError) {
      throw new BadRequestException(
        `${this.controllerName.toUpperCase()}: ${error.message}`
      );
    }

    throw new HttpException(
      `${this.controllerName.toUpperCase()}: Internal server error`,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
