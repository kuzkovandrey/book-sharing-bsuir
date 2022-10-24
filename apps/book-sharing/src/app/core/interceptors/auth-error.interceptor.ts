import { AppRoutes } from '@core/values';
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
import { catchError, delay, Observable, throwError, switchMap } from 'rxjs';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  private handleUnauthorizedException(
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    return this.authService.refreshToken().pipe(
      switchMap(() =>
        next.handle(req).pipe(
          catchError((e) => {
            this.router.navigate([AppRoutes.AUTH]);
            return throwError(() => e);
          })
        )
      )
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
