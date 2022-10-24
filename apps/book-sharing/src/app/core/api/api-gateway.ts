import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ApiGatewayRequestParams {
  url: string;
  body?: object;
  params?: {
    [param: string]:
      | string
      | number
      | boolean
      | ReadonlyArray<string | number | boolean>;
  };
  context?: HttpContext;
}

@Injectable({
  providedIn: 'root',
})
export class ApiGateway {
  constructor(private readonly http: HttpClient) {}

  get<T>({
    url,
    params: queryParams,
    context,
  }: ApiGatewayRequestParams): Observable<T> {
    return this.http.get<T>(url, {
      params: {
        ...queryParams,
      },
      context,
    });
  }

  post<T>({
    url,
    body,
    params: queryParams,
    context,
  }: ApiGatewayRequestParams): Observable<T> {
    return this.http.post<T>(url, body, {
      params: {
        ...queryParams,
      },
      context,
    });
  }

  patch<T>({
    url,
    body,
    params: queryParams,
    context,
  }: ApiGatewayRequestParams): Observable<T> {
    return this.http.patch<T>(url, body, {
      params: {
        ...queryParams,
      },
    });
  }

  delete<T>({
    url,
    params: queryParams,
    context,
  }: ApiGatewayRequestParams): Observable<T> {
    return this.http.delete<T>(url, {
      params: {
        ...queryParams,
      },
      context,
    });
  }
}
