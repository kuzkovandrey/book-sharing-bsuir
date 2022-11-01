import { AppStorageService } from '@core/services/storage';
import { CreateUserDto, UserModel } from '@book-sharing/api-interfaces';
import { Observable, switchMap, tap } from 'rxjs';
import { UserApi } from './../api/user.api';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private userApi: UserApi,
    private appStorageService: AppStorageService
  ) {}

  getInfoById(id: number): Observable<UserModel> {
    return this.userApi.getInfoById(id);
  }

  getPersonalInfo(): Observable<UserModel> {
    return this.userApi.getPersonalInfo();
  }

  updateUserInfo(
    changes: Partial<Omit<CreateUserDto, 'refreshToken'>>
  ): Observable<UserModel> {
    return this.userApi.updateUserInfo(changes);
  }

  deleteAccount(): Observable<unknown> {
    return this.userApi.deleteAccount().pipe(
      tap(() => {
        this.appStorageService.clear();
      })
    );
  }
}
