import { HttpContextToken } from '@angular/common/http';

export const IS_REFRESH_TOKEN_CONTEXT = new HttpContextToken<boolean>(
  () => false
);

export const IS_LOGOUT_CONTEXT = new HttpContextToken<boolean>(() => false);

export const IS_AUTH_CONTEXT = new HttpContextToken<boolean>(() => false);
