import {
  UserModel,
  ApiControllers,
  CreateUserDto,
} from '@book-sharing/api-interfaces';
import { ApiGateway } from '@core/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserApi {
  constructor(private readonly apiGateway: ApiGateway) {}

  getInfoById(id: number): Observable<UserModel> {
    return this.apiGateway.get<UserModel>({
      url: `${ApiControllers.USERS}${ApiControllers.USER}/${id}`,
    });
  }

  getPersonalInfo(): Observable<UserModel> {
    return this.apiGateway.get<UserModel>({
      url: `${ApiControllers.USERS}${ApiControllers.PERSONAL_INFO}`,
    });
  }

  updateUserInfo(
    changes: Partial<Omit<CreateUserDto, 'refreshToken'>>
  ): Observable<UserModel> {
    return this.apiGateway.patch<UserModel>({
      url: `${ApiControllers.USERS}/${ApiControllers.PERSONAL_INFO}`,
      body: changes,
    });
  }

  deleteAccount(): Observable<unknown> {
    return this.apiGateway.delete({
      url: `${ApiControllers.USERS}`,
    });
  }
}
