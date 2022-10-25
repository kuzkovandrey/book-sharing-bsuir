import { AppRoutes } from '@core/values';
import { map, Observable } from 'rxjs';
import { AuthService } from '@features/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthorized$.pipe(
      map((isAuth) => {
        if (isAuth) return true;

        this.router.navigate([AppRoutes.AUTH]);

        return false;
      })
    );
  }
}
