import { IS_REFRESH_TOKEN_CONTEXT } from '@features/auth/api';
import { AppStorageService } from '@core/services/storage';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { StorageKeys } from '..';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private readonly appStorageService: AppStorageService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isRefreshRequest = req.context.get<boolean>(IS_REFRESH_TOKEN_CONTEXT);

    const REQUEST = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${this.appStorageService.get(
          isRefreshRequest
            ? StorageKeys.REFRESH_TOKEN
            : StorageKeys.ACCESS_TOKEN
        )}`
      ),
    });

    return next.handle(REQUEST);
  }
}
