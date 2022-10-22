import { ConfigModule } from '@nestjs/config';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { UsersModule } from './../users/users.module';
import jwtConfig from '@core/config/jwt.config';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.register({}),
    UsersModule,
  ],
  providers: [AuthService, RefreshTokenStrategy, AccessTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
