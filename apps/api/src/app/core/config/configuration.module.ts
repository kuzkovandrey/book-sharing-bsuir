import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import databaseConfig from './database.config';
import mailerConfig from './mailer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, mailerConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.userName'),
        password: configService.get('database.userPassword'),
        database: configService.get('database.name'),
        synchronize: true,
        autoLoadEntities: true,
        // dropSchema: true,
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('mailer.host'),
          name: 'Nodemailer',
          port: configService.get('mailer.port'),
          secure: true,
          auth: {
            user: configService.get('mailer.email'),
            pass: configService.get('mailer.emailPassword'),
          },
        },
      }),
    }),
  ],
})
export class ConfigurationModule {}
