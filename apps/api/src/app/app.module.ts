import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@core/config';
import { AuthModule } from './auth';
import { UsersModule } from './users';
import { BookOffersModule } from './book-offers/book-offers.module';
import { ExchangesModule } from './exchanges/exchanges.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigurationModule,
    UsersModule,
    AuthModule,
    BookOffersModule,
    ExchangesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'book-sharing'),
      exclude: ['/api*'],
    }),
  ],
})
export class AppModule {}
