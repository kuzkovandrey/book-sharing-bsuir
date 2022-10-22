import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@core/config';
import { AuthModule } from './auth';
import { UsersModule } from './users';
import { BookOffersModule } from './book-offers/book-offers.module';

@Module({
  imports: [ConfigurationModule, UsersModule, AuthModule, BookOffersModule],
})
export class AppModule {}
