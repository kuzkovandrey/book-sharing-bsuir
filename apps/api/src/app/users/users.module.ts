import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controlles';
import { TelephoneEntity, UserEntity } from './entities';
import { UsersService } from './services';
import { TelephonesService } from './services/phones.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TelephoneEntity])],
  providers: [UsersService, TelephonesService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
