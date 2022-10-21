import { Injectable } from '@nestjs/common';
import { Message } from '@book-sharing/api-interfaces';

@Injectable()
export class AppService {
  private a: number;
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
  private f = 3;
}
