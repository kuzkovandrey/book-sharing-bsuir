import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { delay, Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable()
export class ProxyInterceptor implements HttpInterceptor {
  private readonly DELAY = environment.production ? 0 : 500;

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const request = req.clone({
      url: environment.baseUrl + req.url,
    });

    return next.handle(request).pipe(delay(this.DELAY));
  }
}
