import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookOffersModule } from '../book-offers';
import { ExchangeEntity } from './entities';
import { ExchangesService } from './services';
import { ExchangesController } from './controllers/exchanges.controller';

@Module({
  imports: [BookOffersModule, TypeOrmModule.forFeature([ExchangeEntity])],
  controllers: [ExchangesController],
  providers: [ExchangesService],
})
export class ExchangesModule {}
