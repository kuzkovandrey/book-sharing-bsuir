import {
  ApiControllers,
  CreateUserDto,
  AuthDto,
  TokenDto,
} from '@book-sharing/api-interfaces';
import { BaseController } from '@core';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';

@Controller(ApiControllers.AUTH)
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super(AuthController.name);
  }

  @Post(ApiControllers.SIGN_UP)
  async signup(@Body() createUserDto: CreateUserDto): Promise<TokenDto> {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      this.throwHttpExeption(error);
    }
  }

  @Post(ApiControllers.SIGN_IN)
  async signin(@Body() data: AuthDto): Promise<TokenDto> {
    try {
      return await this.authService.signIn(data);
    } catch (error) {
      this.throwHttpExeption(error);
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get(ApiControllers.LOGOUT)
  logout(@Req() req: Request): Promise<unknown> {
    return this.authService.logout((req as any).user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Get('test')
  test() {
    return 'test';
  }

  @UseGuards(RefreshTokenGuard)
  @Get(ApiControllers.REFRESH)
  async refreshTokens(@Req() req: Request) {
    try {
      const userId = (req as any).user['sub'];
      const refreshToken = (req as any).user['refreshToken'];
      return this.authService.refreshTokens(userId, refreshToken);
    } catch (error) {
      this.throwHttpExeption(error);
    }
  }
}
