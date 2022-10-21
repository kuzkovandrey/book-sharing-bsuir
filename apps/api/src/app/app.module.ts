import { Module } from '@nestjs/common';
import { ConfigurationModule } from './core/config';

@Module({
  imports: [ConfigurationModule],
})
export class AppModule {}
