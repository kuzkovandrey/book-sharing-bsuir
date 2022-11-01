import { ApiControllers } from './../../../../../../libs/api-interfaces/src/lib/values/api-controllers.enum';
import { AppRoutes, StorageKeys } from '@core/values';
import { Router } from '@angular/router';
import { AuthService } from '@features/auth';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import {
  catchError,
  delay,
  Observable,
  throwError,
  switchMap,
  map,
} from 'rxjs';
import { AppStorageService } from '@core/services/storage';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private appStorageService: AppStorageService
  ) {}

  private handleUnauthorizedException(
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    return this.authService.refreshToken().pipe(
      switchMap(() => {
        const REQ = req.clone({
          headers: req.headers.set(
            'Authorization',
            `Bearer ${this.appStorageService.get(StorageKeys.ACCESS_TOKEN)}`
          ),
        });

        return next.handle(REQ).pipe(
          catchError((e) => {
            this.router.navigate([AppRoutes.AUTH]);

            return throwError(() => {});
          })
        );
      }),
      catchError((e) => {
        this.router.navigate([AppRoutes.AUTH]);

        return throwError(() => e);
      })
    );
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any> | never> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          return this.handleUnauthorizedException(req, next);
        }

        return throwError(() => error);
      })
    );
  }
}
