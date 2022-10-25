import {
  UserAlredyExistsError,
  IncorrectUserAuthError,
  AccessDeniedError,
} from './../core/base/errors';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, AuthDto, TokenDto } from '@book-sharing/api-interfaces';
import { UsersService } from '@users/services';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '@core/config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY) private jwt: ConfigType<typeof jwtConfig>
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<TokenDto> {
    const userExists = await this.usersService.findByUsername(
      createUserDto.username
    );

    if (userExists) throw new UserAlredyExistsError();

    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser.id, newUser.username);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async signIn(data: AuthDto): Promise<TokenDto> {
    const user = await this.usersService.findByUsername(data.username);

    if (!user) throw new UserAlredyExistsError();

    const passwordMatches = await argon2.verify(user.password, data.password);

    if (!passwordMatches) throw new IncorrectUserAuthError();

    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: number) {
    return this.usersService.update(userId, { refreshToken: null });
  }

  hashData(data: string): Promise<string> {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.jwt.accessSecret,
          expiresIn: '30m',
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.jwt.refreshSecret,
          expiresIn: '7d',
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.refreshToken) throw new AccessDeniedError();

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken
    );

    if (!refreshTokenMatches) throw new AccessDeniedError();

    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
