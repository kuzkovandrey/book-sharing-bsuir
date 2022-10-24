import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthErrorInterceptor } from './auth-error.interceptor';
import { HeadersInterceptor } from './headers.interceptor';
import { ProxyInterceptor } from './proxy.interceptor';

export const InterceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ProxyInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthErrorInterceptor,
    multi: true,
  },
];
