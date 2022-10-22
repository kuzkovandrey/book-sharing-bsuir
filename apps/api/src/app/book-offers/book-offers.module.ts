import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookOfferEntity, DeliveryEntity } from './entities';
import { BookOffersService, DeliveriesInitService } from './services';
import { BooksModule } from '@books/books.module';
import { UsersModule } from '@users/users.module';
import { BookOffersController } from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookOfferEntity, DeliveryEntity]),
    BooksModule,
    UsersModule,
  ],
  controllers: [BookOffersController],
  providers: [BookOffersService, DeliveriesInitService],
})
export class BookOffersModule {}
