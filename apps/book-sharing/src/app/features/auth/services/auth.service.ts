import { AuthDto, CreateUserDto, TokenDto } from '@book-sharing/api-interfaces';
import { AuthApi } from '../api';
import { Injectable } from '@angular/core';
import { AppStorageService } from '@core/services/storage';
import { BehaviorSubject, tap, Observable } from 'rxjs';
import { StorageKeys } from '@core/values';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isAuthorized = new BehaviorSubject<boolean>(
    !!this.getToken(StorageKeys.ACCESS_TOKEN)
  );

  get isAuthorized$(): Observable<boolean> {
    return this.isAuthorized.asObservable();
  }

  constructor(
    private readonly authApi: AuthApi,
    private readonly appStorageService: AppStorageService
  ) {}

  signin(authDto: AuthDto) {
    return this.authApi.signin(authDto).pipe(
      tap((payload) => {
        this.saveTokens(payload);
        this.setAuth(true);
      })
    );
  }

  signup(user: AuthDto) {
    return this.authApi.signup(user).pipe(
      tap((payload) => {
        this.saveTokens(payload);
        this.setAuth(true);
      })
    );
  }

  logout() {
    return this.authApi.logout().pipe(
      tap(() => {
        this.appStorageService.clear();
        this.setAuth(true);
      })
    );
  }

  refreshToken() {
    return this.authApi.refreshToken().pipe(tap(this.saveTokens));
  }

  private saveTokens = ({ accessToken, refreshToken }: TokenDto) => {
    this.setToken(accessToken, StorageKeys.ACCESS_TOKEN);
    this.setToken(refreshToken, StorageKeys.REFRESH_TOKEN);
  };

  private getToken(type: StorageKeys): string {
    return this.appStorageService.get<string>(type);
  }

  private setToken(token: string, type: StorageKeys) {
    this.appStorageService.set<string>(type, token);
  }

  private setAuth(isAuth: boolean) {
    this.isAuthorized.next(isAuth);
  }
}
