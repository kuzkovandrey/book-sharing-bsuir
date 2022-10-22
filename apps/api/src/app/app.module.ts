import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@core/config';
import { AuthModule } from './auth';
import { UsersModule } from './users';
import { BooksModule } from './books/books.module';

@Module({
  imports: [ConfigurationModule, UsersModule, AuthModule, BooksModule],
})
export class AppModule {}
