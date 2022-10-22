import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@core/config';
import { AuthModule } from './auth';
import { UsersModule } from './users';

@Module({
  imports: [ConfigurationModule, UsersModule, AuthModule],
})
export class AppModule {}
