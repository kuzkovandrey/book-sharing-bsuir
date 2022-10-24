import {
  IS_AUTH_CONTEXT,
  IS_LOGOUT_CONTEXT,
  IS_REFRESH_TOKEN_CONTEXT,
} from './auth-api-context';
import {
  ApiControllers,
  AuthDto,
  CreateUserDto,
  TokenDto,
} from '@book-sharing/api-interfaces';
import { HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGateway } from '@core/api';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  constructor(private readonly api: ApiGateway) {}

  signin(authDto: AuthDto): Observable<TokenDto> {
    return this.api.post<TokenDto>({
      url: `${ApiControllers.AUTH}${ApiControllers.SIGN_IN}`,
      body: authDto,
      context: new HttpContext().set(IS_AUTH_CONTEXT, true),
    });
  }

  signup(user: AuthDto): Observable<TokenDto> {
    return this.api.post<TokenDto>({
      url: `${ApiControllers.AUTH}${ApiControllers.SIGN_UP}`,
      body: user,
      context: new HttpContext().set(IS_AUTH_CONTEXT, true),
    });
  }

  logout(): Observable<unknown> {
    return this.api.get<unknown>({
      url: `${ApiControllers.AUTH}${ApiControllers.LOGOUT}`,
      context: new HttpContext().set(IS_LOGOUT_CONTEXT, true),
    });
  }

  refreshToken(): Observable<TokenDto> {
    return this.api.get<TokenDto>({
      url: `${ApiControllers.AUTH}${ApiControllers.REFRESH}`,
      context: new HttpContext().set(IS_REFRESH_TOKEN_CONTEXT, true),
    });
  }
}
